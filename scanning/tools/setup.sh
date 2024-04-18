#!/bin/bash

#colors 
END="\e[1m"
Red="\e[31m"
GREEN="\e[32m"
BOLDGREEN="\e[1;${GREEN}"
YELLOW="\033[0;33m"
Cyan="\e[0;36m"
white="\e[0;37m"

#check you are root or not
if [ $EUID -ne 0 ]
	then echo -e "${Red}Please run as a root${END}"
	exit
fi
#banner for Script to look cool

echo -e "
${Red}
  ####   ######   #####  #    #  #####
 #       #          #    #    #  #    #
  ####   #####      #    #    #  #    #
      #  #          #    #    #  #####
 #    #  #          #    #    #  #
  ####   ######     #     ####   # v1                               
 "
 
requirements(){
	#Updating System
	echo "Updating System"
	sudo apt update &> /dev/null
	
	# check go 
	go_v=$(go version) 2> /dev/null
	if ! command -v go &> /dev/null
	then
		echo "go is not installed"
		echo "installing go now "
		sudo apt remove -y golang-go &>/dev/null
		sudo rm -rf /usr/local/go &>/dev/null
		wget https://go.dev/dl/go1.22.2.linux-amd64.tar.gz &>/dev/null
		sudo tar -xvf go1.22.2.linux-amd64.tar.gz -C /usr/local/ &>/dev/null
		export GOPATH=$HOME/go
		export PATH=$PATH:/usr/local/go/bin
		export PATH=$PATH:$GOPATH/bin
		source /etc/profile #to update you shell don't worry
	else
		echo -e "${Cyan}Go is already installed and your version is: ${go_v:13}${END}"
	fi
	if ! command -v go &> /dev/null
	then
		echo "If you get this message, run 'source /etc/profile' to update your shell and run again. #golang is installed, have a good day!"
		exit
	fi
	apt install build-essential -y &> /dev/null

	# Check For The requirements
	if ! command -v git ruby rustc python3 &> /dev/null
	then
		echo "Git, Ruby, Rust, or Python is not installed. We will install them for you now."
		echo "Installing Git"
		apt install git -y &> /dev/null
		echo "Installing Ruby"
		apt install ruby-full -y &> /dev/null
		echo "Installing Rust"
		curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh &> /dev/null
		echo "Installing Python"
		apt install python3 -y &> /dev/null
		apt install python3-pip -y &> /dev/null
	else
		echo -e "${BOLDGREEN}All requirements are already installed.${END}"
	fi
}


tools(){

	#Check if whatweb installed or not
	if ! command -v whatweb &> /dev/null
	then
		echo "Installing whatweb now"
		git clone https://github.com/urbanadventurer/WhatWeb.git &> /dev/null
		cd WhatWeb/ 
		gem install bundler &> /dev/null
		bundle update &> /dev/null
		bundle install &> /dev/null
		echo "whatweb installation is done"
	else
		echo "whatweb is already installed"
	fi

	# Check if subfinder installed or not
	if ! command -v subfinder &> /dev/null
	then
		echo "Installing subfinder now"
		go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest &> /dev/null
		sudo cp $HOME/go/bin/subfinder /usr/local/bin
		echo "subfinder installation is done"
	else
		echo "subfinder is already installed"
	fi
	
	# Check if wafw00f installed or not
	if ! command -v wafw00f &> /dev/null
	then
		echo "Installing wafw00f now"
		sudo apt install wafw00f &> /dev/null
		echo "wafw00f installation is done"
	else
		echo "wafw00f is already installed"
	fi
	
	#Check if dirsearch installed or not
	if ! command -v dirsearch &> /dev/null
	then
		echo "Installing dirsearch now"
		pip install dirsearch &> /dev/null
		echo "dirsearch installation is done"
	else
		echo "dirsearch is already installed"
	fi
	
	#Check if cvemap installed or not
	if ! command -v cvemap &> /dev/null
	then
		echo "Installing cvemap now"
		go install github.com/projectdiscovery/cvemap/cmd/cvemap@latest &> /dev/null
		echo "cvemap installation is done"
	else
		echo "cvemap is already installed"
	fi
	
	#Check if sqlmap installed or not
	if ! command -v sqlmap &> /dev/null
	then
		echo "Installing sqlmap now"
		sudp apt install sqlmap &> /dev/null
		echo "sqlmap installation is done"
	else
		echo "sqlmap is already installed"
	fi
	
	#Check if qsreplace installed or not
	if ! command -v qsreplace &> /dev/null
	then
		echo "Installing qsreplace now"
		go install github.com/tomnomnom/qsreplace@latest &> /dev/null
		echo "qsreplace installation is done"
	else
		echo "qsreplace is already installed"
	fi
	
	#Check if kxss installed or not
	if ! command -v kxss &> /dev/null
	then
		echo "Installing kxss now"
		go install github.com/Emoe/kxss@latest &> /dev/null
		echo "kxss installation is done"
	else
		echo "kxss is already installed"
	fi
	
	#Check if httpx installed or not
	if ! command -v httpx &> /dev/null
	then
		echo "Installing httpx now"
		go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest &> /dev/null
		echo "httpx installation is done"
	else
		echo "httpx is already installed"
	fi
	
	#Check if searchsploit installed or not
	if ! command -v searchsploit &> /dev/null
	then
		echo "Installing searchsploit now"
		git clone https://www.github.com/Err0r-ICA/Searchsploit &> /dev/null
		cd Searchsploit 
		bash install.sh &> /dev/null
		sudo cp Searchsploit /usr/local/bin/searchsploit &> /dev/null 
		echo "searchsploit installation is done"
	else
		echo "searchsploit is already installed"
	fi
	
	#Check if massdns installed or not
	if ! command -v massdns &> /dev/null
	then
		echo "Installing sqlmap now"
		sudp apt install massdns &> /dev/null
		echo "massdns installation is done"
	else
		echo "massdns is already installed"
	fi
	
	#Check if nikto installed or not
	if ! command -v nikto &> /dev/null
	then
		echo "Installing nikto now"
		sudp apt install nikto &> /dev/null
		echo "nikto installation is done"
	else
		echo "nikto is already installed"
	fi
	
	#Check if dnsrecon installed or not
	if ! command -v dnsrecon &> /dev/null
	then
		echo "Installing dnsrecon now"
		sudp apt install dnsrecon &> /dev/null
		echo "dnsrecon installation is done"
	else
		echo "dnsrecon is already installed"
	fi
	
	#Check if sslyze installed or not
	if ! command -v sslyze &> /dev/null
	then
		echo "Installing dnsrecon now"
		pip install --upgrade pip setuptools wheel &> /dev/null
		pip install --upgrade sslyze &> /dev/null
		echo "dnsrecon installation is done"
	else
		echo "dnsrecon is already installed"
	fi
	
	
	
	


	
	
	
	
}

requirements
tools



