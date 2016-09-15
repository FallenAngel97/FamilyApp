using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

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
    }
}
