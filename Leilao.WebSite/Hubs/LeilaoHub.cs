using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Leilao.WebSite.Hubs
{
    [HubName("leilaohub")]
    public class LeilaoHub : Hub
    {
        public void Lance(string name, int id_item)
        {
            // Call the addNewMessageToPage method to update clients.
            Clients.All.LanceEfetuado(name, id_item, DateTime.Now.ToString());
        }
    }
}