using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using AngularDemo.Repository;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AngularDemo.Hubs
{
    [HubName("ChatHub")]
    public class ChatHub : Hub
    {
        private static readonly  Dictionary<string,string> UserMapping = new Dictionary<string, string>();
        private readonly IChatRepository _chatRepository;
        public ChatHub(IChatRepository repo)
        {
            _chatRepository = repo;
            Debug.Assert(_chatRepository != null);
        }
        public override Task OnConnected()
        {            
            return base.OnConnected();
        }        

        public void HelloServer(string msg)
        {
            Debug.WriteLine(msg);


        }
        public void Hello(string msg)
        {
            Clients.AllExcept(Context.ConnectionId).hello("Hello From Server");
        }

        public void RegisterUser(string userId)
        {
            UserMapping.Add(userId,Context.ConnectionId);
            Clients.Caller.registrationDone("Registered");
        }

        public void SendMessage(int fromId,int toId,string message)
        {
            Clients.Client(toId.ToString()).receiveMessage(message);
        }

        public override Task OnDisconnected()
        {            
            return base.OnDisconnected();
        }
    }
}