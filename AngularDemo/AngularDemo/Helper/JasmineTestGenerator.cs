using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Hosting;
using AngularDemo.Models;

namespace AngularDemo.Helper
{
    public class JasmineTestGenerator
    {
        private static int _index = 0;
        public static JasmineSpec GetScriptListing(string node)
        {
            if (!Path.IsPathRooted(node))
            {
                node = HostingEnvironment.MapPath(node);
            }
            JasmineSpec rootNodeJasmineSpec = new JasmineSpec();
            if (Directory.Exists(node))
            {
                _index++;
                rootNodeJasmineSpec.Id = _index;
                foreach (FileInfo fileInfo in GetFilesInCurrentDirector(node))
                {
                    rootNodeJasmineSpec.ChildJasimeSpec.Add(GetScriptListing(fileInfo.FullName));
                }                                
            }
            else
            {
                throw new ArgumentException("Invalid Path");
            }
            return rootNodeJasmineSpec;
        }

        public static List<FileInfo> GetFilesInCurrentDirector(string path)
        {
            return Directory.GetFiles(path,"*.js").Select(file => new FileInfo(file)).ToList();
        }

        public static List<DirectoryInfo> GetChilDirectoryList(string path)
        {
            return Directory.GetDirectories(path).Select(directory => new DirectoryInfo(directory)).ToList();
        }

        public static List<FileInfo> GetSpecListing(string node)
        {            
            if (!Path.IsPathRooted(node))
            {
                node = HostingEnvironment.MapPath(node);
            }

            return Directory.GetFiles(node, "*.js", SearchOption.AllDirectories).Select(x => new FileInfo(x)).ToList();
        }

        

        public static string GenerateScriptTags(string rootPath,JasmineSpec spec)
        {
            StringBuilder sb = new StringBuilder();
            string scriptTag = @"<script type=""text/javascript"" src=""{0}""></script>" + Environment.NewLine;
            return scriptTag;
        }
    }
}