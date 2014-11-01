using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Client;
using NUnit.Framework;

namespace AngularDemo.Test.SignalRTest
{
    [TestFixture]
    public class ChatHubTest
    {
        private AutoResetEvent _autoResetEvents;
        private HubConnection _connection,_connection2;
        private IHubProxy _proxy,_proxy2;
        [SetUp]
        public void Initialize()
        {
            _autoResetEvents = new AutoResetEvent(false);
            _connection = new HubConnection("http://localhost:30188");
            _connection2 = new HubConnection("http://localhost:30188");
            _proxy = _connection.CreateHubProxy("ChatHub");
            _proxy2 = _connection2.CreateHubProxy("ChatHub");
        }

        [TearDown]
        public void TearDown()
        {
            _autoResetEvents.Dispose();
            if (_connection != null && _connection.State == ConnectionState.Connected)
            {
                _connection.Stop();
                _connection.Dispose();
            }
            Debug.WriteLine("Connection Closed");
            if (_connection2 != null && _connection2.State == ConnectionState.Connected)
            {
                _connection2.Stop();
                _connection2.Dispose();
            }
        }

        [Test]
        public void TestInitialConnection()
        {            
            _proxy2.On("hello", (msg) =>
                              {
                                  this._autoResetEvents.Set();
                                  Assert.That(msg,Is.EqualTo("Hello From Server"));                                 
                              });
            _connection.Start().Wait();
            Debug.WriteLine(_connection.ConnectionId);
            _connection2.Start().Wait();
            Debug.WriteLine(_connection2.ConnectionId);
            _proxy.Invoke("Hello", "Hello From Client");
            this._autoResetEvents.WaitOne();
        }

    }
}
