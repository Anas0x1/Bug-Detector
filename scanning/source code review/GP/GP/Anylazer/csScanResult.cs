using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GP.Anylazer
{
        /// Contains all the information gained during the analysis of the specific

    public class csScanResult
    {

        public DateTime MethodScanResultStartTime { get; private set; }
        public DateTime MethodScanResultEndTime { get; set; }
        public TimeSpan MethodScanResultTotalTime { get; set; }
        public string MethodName { get; private set; }
        public string MethodBody { get; private set; }
        public bool HasSQLInjection { get;  set; }
        public int LineCount { get; private set; }
        public string methodPath { get; set; }
        

        public csScanResult(DateTime startTime, string name, string body, bool hasSQLInjection, int lineCount)
        {
            this.MethodScanResultStartTime = startTime;
            this.MethodName = name;
            this.MethodBody = body;
            this.HasSQLInjection = hasSQLInjection;
            this.LineCount = lineCount;
           
        }

    }
}
