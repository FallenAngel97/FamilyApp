using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFamilyTree.Models
{
    public class AreWeDebug
    {
        public static bool IsDebug()
        {
#if DEBUG
            return true;
#else
            return false;
#endif
        }
    }
}
