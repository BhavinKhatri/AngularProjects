using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace AngularDemo.Models
{
    public class JasmineSpec
    {
        public JasmineSpec()
        {
            this.ChildJasimeSpec = new List<JasmineSpec>();
        }
        public int Id { get; set; }

        public FileInfo ScriptFileInfo { get; set; }

        public List<JasmineSpec> ChildJasimeSpec { get; set; }

        public string FileName
        {
            get { return this.ScriptFileInfo.Name; }
        }
    }
}