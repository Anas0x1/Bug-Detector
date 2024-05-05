#!/bin/bash

url=$1

# Fetch the /crossdomain.xml file and check the HTTP response code
response=$(curl -s -o /dev/null -w "%{http_code}" "${url}/crossdomain.xml")

echo "#################################################################################"
echo -e "Scanning the existance of /crossdomain.xml file"
echo "#################################################################################"

# Check if the response code is 200 (OK) or 301 (Moved Permanently)
if [ "$response" -eq 200 ] || [ "$response" -eq 301 ]; then
	echo """Vulnerability description
We have noticed that the target application has overly permissive settings in its client access policy files. The crossdomain.xml file controls the access of externally hosted Flash scripts to this website, while clientaccesspolicy.xml specifies other sites that can read content from this website - which is normally denied by the Same Origin Policy. This vulnerability arises from configurations that grant excessive permissions to clients.

Risk description
In crossdomain.xml, the external websites which are permitted to read content from this website via Flash are specified in the XML tag <allow-access-from>. If the value of this tag is too permissive (ex. wildcard), it means that any Flash script from an external website could access content from this website, including confidential information of users.

If the allowed domains are too permissive (ex. wildcard) in clientaccesspolicy.xml, then any external website will be able to read content (including sensitive information) from this website.
Flash is not supported anymore and this poses a risk only if the user's clients use older browsers, making them vulnerable to their information being accessed by a malicious external Flash script.

Recommendation
We recommend to carefully review the content of the policy file and permit access only for legitimate domains.

References
http://blog.h3xstream.com/2015/04/crossdomainxml-beware-of-wildcards.html
https://msdn.microsoft.com/en-us/library/cc197955(v=vs.95).aspx

Classification
CWE: CWE-16
OWASP Top 10 - 2013: A5 - Security Misconfiguration
OWASP Top 10 - 2017: A6 - Security Misconfiguration
	"""
	echo "#################################################################################"
	echo -e "http://${url}/crossdomain.xml is existed "
else
	echo "File does not exist"
	echo "#################################################################################"
	echo -e " /crossdomain.xml does not exist for http://${url}"
fi


