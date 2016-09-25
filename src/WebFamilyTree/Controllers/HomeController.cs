using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Threading;
using System.Windows.Forms;
using System.IO;
using System.Runtime.InteropServices;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebFamilyTree.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public HomeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
#if DEBUG
            ViewBag.cssText = "css/main.css";
            ViewBag.jsText = "typescript/main.js";
            ViewBag.imageBase = "images";
#else
            ViewBag.cssText = "css/main.css";
            ViewBag.jsText = "js/main.js";
            ViewBag.imageBase = "img";
#endif
            return View();
        }
        // GET: /<controller>/ScreenShot
        [HttpPost]
        public FileResult ScreenShot(string htmlToParse)
        {
            htmlToParse = "<!DOCTYPE html><html>" + htmlToParse + "</html>";
            return Capture(htmlToParse);
        }

        protected FileResult Capture(string html)
        {

            HtmlAgilityPack.HtmlDocument htmlDoc = new HtmlAgilityPack.HtmlDocument();
            htmlDoc.LoadHtml(html);
            var head = htmlDoc.DocumentNode.SelectSingleNode("//head");
#if DEBUG
            StreamReader streamReader = new StreamReader(@"wwwroot/css/main.css"); //browser.css is Stylesheet file
#else
            StreamReader streamReader = new StreamReader(@"wwwroot/css/main.min.css"); //browser.css is Stylesheet file
#endif
            string text = streamReader.ReadToEnd();
            streamReader.Close();
            string cssText = "<style>"  + text + @"* {
 -o-transition-property: none !important;
 -moz-transition-property: none !important;
 -ms-transition-property: none !important;
 -webkit-transition-property: none !important;
 transition-property: none !important;
 -o-transform: none !important;
 -moz-transform: none !important;
 -ms-transform: none !important;
 -webkit-transform: none !important;
 transform: none !important;
 -webkit-animation: none !important;
 -moz-animation: none !important;
 -o-animation: none !important;
 -ms-animation: none !important;
 animation: none !important;
}section{opacity:1;}
" + "</style>";
            HtmlNode node = HtmlNode.CreateNode(cssText);
            head.AppendChild(node);

#if DEBUG
            streamReader = new StreamReader(@"wwwroot/typescript/main.js"); //browser.css is Stylesheet file
#else
            streamReader = new StreamReader(@"wwwroot/js/main.min.js"); //browser.css is Stylesheet file
#endif
            text = streamReader.ReadToEnd();
            streamReader.Close();
            string jsText = "<script>" + text + "</script>";
            node = HtmlNode.CreateNode(cssText);
            head.AppendChild(node);
#if DEBUG
            var nodes  =  htmlDoc.DocumentNode.SelectNodes("//img[@class='emptyPersonImage']").ToArray();
#else
            var nodes = htmlDoc.DocumentNode.SelectNodes("//img[@class='p']").ToArray();
#endif

            for (int i = 0; i < nodes.Length; i++)
            {
                nodes[i].Attributes["src"].Value ="file://"+ _hostingEnvironment.WebRootPath.Replace('\\','/') + nodes[i].Attributes["src"].Value;
                System.Diagnostics.Debug.WriteLine(nodes[i].Attributes["src"].Value);
            }
            html = htmlDoc.DocumentNode.InnerHtml;
            FileResult aResult = null;
            Thread thread = new Thread(delegate ()
            {
                using (WebBrowser browser = new WebBrowser())
                {
                    browser.ScrollBarsEnabled = false;
                    browser.AllowNavigation = true;
                    browser.DocumentText = html;
                    browser.Width = 1920;
                    browser.Height = 1080;
                    browser.DocumentCompleted += new WebBrowserDocumentCompletedEventHandler((s,e)=> { aResult = DocumentCompleted(s,e); });
                    while (browser.ReadyState != WebBrowserReadyState.Complete)
                    {
                        Application.DoEvents();
                    }
                }
            });
            thread.SetApartmentState(ApartmentState.STA);
            thread.Start();
            thread.Join();
            return aResult;
        }

        private FileResult DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            WebBrowser browser = sender as WebBrowser;
            byte[] bytes;
            using (Bitmap bitmap = new Bitmap(browser.Width, browser.Height))
            {
                browser.DrawToBitmap(bitmap, new Rectangle(0, 0, browser.Width, browser.Height));
                using (MemoryStream stream = new MemoryStream())
                {
                    bitmap.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                    bytes = stream.ToArray();
                }
            }
            return File(bytes, System.Net.Mime.MediaTypeNames.Image.Jpeg, "screen.jpg");
        }

    }
}
