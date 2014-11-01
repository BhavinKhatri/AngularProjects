using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using AngularDemo.Repository;
using Autofac;
using Autofac.Integration.SignalR;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularDemo.Startup))]
namespace AngularDemo
{

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<ChatRepository>().As<IChatRepository>().InstancePerDependency();
            builder.RegisterHubs(Assembly.GetExecutingAssembly());

            var container = builder.Build();
            var depResolver = new Autofac.Integration.SignalR.AutofacDependencyResolver(container);


            var hubConfig = new HubConfiguration()
                            {
                                Resolver = depResolver
                            };
            app.MapSignalR(hubConfig);
        }
    }
}