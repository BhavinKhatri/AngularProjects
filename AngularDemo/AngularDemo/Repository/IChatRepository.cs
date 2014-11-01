using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularDemo.Repository
{
    public interface IChatRepository
    {
        void SendMessage(int id);
    }
}
