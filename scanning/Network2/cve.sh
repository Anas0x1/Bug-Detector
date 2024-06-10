#!/bin/bash

#test ip = 105.214.21.221

# URL of the webpage
url="https://www.shodan.io/host/$1"

# Fetch the HTML content using curl
html_content=$(curl -s "$url")

# Extract the CVE numbers using grep with a regex pattern
cves=$(echo "$html_content" | grep -oP '<a href="/search\?query=vuln%3ACVE-\d{4}-\d+" class="text-dark">\KCVE-\d{4}-\d+' | sed 's/.*vuln%3ACVE-\([0-9]*-[0-9]*\).*/\1/')
# Extract the CVE links
links=$(echo "$html_content" | grep -oP '<a href="/search\?query=vuln%3ACVE-\d{4}-\d+" class="text-dark"')

# Count the number of CVEs
cves_number=$(echo "$cves" | wc -l)


echo "Title: Vulnerabilities IP: $1"
echo "######################################################################"

echo "Output: "
# Iterate over each CVE and its link
while IFS= read -r cve && IFS= read -r link <&3; do
    #Add Description
    description=$(curl -s "https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=$cve&search_type=all&isCpeNameSearch=false" | grep -oP '<p data-testid="vuln-summary-0">\K.*?(?=</p>)' | sed 's/&\#39;/\'"'"'/g')
    # Replace the placeholder in the URL with the current CVE
    mitre="https://cve.mitre.org/cgi-bin/cvename.cgi?name=$cve"
    nist="https://nvd.nist.gov/vuln/detail/$cve"
    echo -e "CVE Number: $cve"
    echo -e "Description: $description"
    echo -e "MITRE Reference: $mitre"
    echo -e "NIST Reference: $nist"
    echo " "
done <<< "$cves" 3<<< "$links"

echo -e "This IP $1 is vulnerable with $cves_number CVEs."

echo "######################################################################"
echo "Description: Scan for vulnerabilities associated with the discovered device(s) using Shodan, enabling identification of potential security weaknesses in the targeted systems and networks."
echo "######################################################################"


echo "Title: Mitigation IP: $1"
echo "######################################################################"

echo "Output: "
while IFS= read -r cve; do
    # Query the NVD database for CVE details and mitigations
    response=$(curl -s "https://services.nvd.nist.gov/rest/json/cve/1.0/$cve")
    
     
    # Check if the response contains valid JSON
    if echo "$response" | jq empty 2>/dev/null; then
        # Extract mitigation using jq
        mitigation=$(echo "$response" | jq -r '.result.CVE_Items[0].cve.description.description_data[].value')
        if [ -n "$mitigation" ]; then
            echo "Mitigation for $cve: $mitigation"
        else
            echo "No mitigation found for $cve"
        fi
    else
        echo "Error: Unable to retrieve data for cve"
    fi
done <<< "$cves"
echo "######################################################################"
echo "Description: Search in NVD Database for mitigation techniques for discovered vulnerabilities"
echo "######################################################################"
