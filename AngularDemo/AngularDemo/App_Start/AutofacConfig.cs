using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using AngularDemo.Controllers;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.SignalR;
using Autofac.Integration.WebApi;

namespace AngularDemo
{
    public class AutofacConfig
    {
        public static IContainer RegisterDependencies()
        {
            var container = new ContainerBuilder();
            container.RegisterHubs(Assembly.GetExecutingAssembly());
            container.RegisterApiControllers(Assembly.GetExecutingAssembly());
            container.RegisterControllers(Assembly.GetExecutingAssembly());
            container.RegisterWebApiModelBinders(Assembly.GetExecutingAssembly());
            return container.Build();
        }
    }
}