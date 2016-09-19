using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Threading;
using System.Windows.Forms;
using System.IO;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebFamilyTree.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
#if DEBUG
            ViewBag.cssText = "css/main.css";
            ViewBag.jsText = "typescript/main.js";
            ViewBag.imageBase = "images";
#else
            ViewBag.cssText = "css/main.min.css";
            ViewBag.jsText = "js/main.js";
            ViewBag.imageBase = "img";
#endif
            return View();
        }
        // GET: /<controller>/ScreenShot
        public FileResult ScreenShot()
        {
            throw new NotImplementedException();
        }

        protected void Capture(object sender, EventArgs e)
        {
            string url = txtUrl.Text.Trim();
            Thread thread = new Thread(delegate ()
            {
                using (WebBrowser browser = new WebBrowser())
                {
                    browser.ScrollBarsEnabled = false;
                    browser.AllowNavigation = true;
                    browser.Navigate(url);
                    browser.Width = 1920;
                    browser.Height = 1080;
                    browser.DocumentCompleted += new WebBrowserDocumentCompletedEventHandler(DocumentCompleted);
                    while (browser.ReadyState != WebBrowserReadyState.Complete)
                    {
                        Application.DoEvents();
                    }
                }
            });
            thread.SetApartmentState(ApartmentState.STA);
            thread.Start();
            thread.Join();
        }

        private void DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            WebBrowser browser = sender as WebBrowser;
            using (Bitmap bitmap = new Bitmap(browser.Width, browser.Height))
            {
                browser.DrawToBitmap(bitmap, new Rectangle(0, 0, browser.Width, browser.Height));
                using (MemoryStream stream = new MemoryStream())
                {
                    bitmap.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                    byte[] bytes = stream.ToArray();
                    var s = "data:image/png;base64," + Convert.ToBase64String(bytes);
                }
            }
        }

    }
}
