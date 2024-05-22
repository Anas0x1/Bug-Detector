#!/bin/bash
red="\e[31m"
green="\e[32m"
cyan="\e[36m"
bold="\e[1m"
reset="\e[0m"
boldred="${bold}${red}"
boldgreen="${bold}${green}"
boldcyan="${bold}${cyan}"

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


echo -e "\n${cyan}################ Vulnerabilities ################${reset}"
echo -e "[*] CVE Numbers and their Reference Links for IP $1:\n"

# Iterate over each CVE and its link
while IFS= read -r cve && IFS= read -r link <&3; do
    #Add Description
    description=$(curl -s "https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=$cve&search_type=all&isCpeNameSearch=false" | grep -oP '<p data-testid="vuln-summary-0">\K.*?(?=</p>)' | sed 's/&\#39;/\'"'"'/g')
    # Replace the placeholder in the URL with the current CVE
    mitre="https://cve.mitre.org/cgi-bin/cvename.cgi?name=$cve"
    nist="https://nvd.nist.gov/vuln/detail/$cve"
    echo -e "${green}CVE Number: $cve${reset}"
    echo -e "Description: $description"
    echo -e "MITRE Reference: $mitre"
    echo -e "NIST Reference: $nist"
    echo " "
done <<< "$cves" 3<<< "$links"

echo -e "${green}[~] This IP $1 is vulnerable with $cves_number CVEs.${reset}"

