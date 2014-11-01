using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularDemo.Helper;
using AngularDemo.Models;

namespace AngularDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {            
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Employee()
        {
            ViewBag.Title = "Home Page";

            return View("Employee");
        }

        public ActionResult Chat()
        {
            return View();
        }
    }
}
