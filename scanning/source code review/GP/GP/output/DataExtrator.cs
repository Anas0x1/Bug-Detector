using GP.Anylazer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GP.output
{
    public class DataExtrator
    {
        List<csScanResult> resultList = new List<csScanResult>();
        List<csScanResult> VlunarableMethods = new List<csScanResult>();

        DataExtrator(List<csScanResult> resultList)
        {
            this.resultList = resultList;
            foreach (csScanResult result in resultList)
            {
                if (result.HasSQLInjection == true)
                {
                    VlunarableMethods.Add(result);
                }
            }
        }
        public int NumberOfScanedMethods()
        {
            return resultList.Count();
        }
        public int NumberOfvulnarableMethod()
        {
            return VlunarableMethods.Count;
        }
        public int NumberOfSecureMethod()
        {
            return NumberOfScanedMethods() - NumberOfvulnarableMethod();
        }

    }
}
