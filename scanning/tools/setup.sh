#!/bin/bash

# Check if the script is run as root
if [ $EUID -ne 0 ]; then
    echo -e "Please run as root"
    exit 1
fi

# Banner for the script
echo -e "
  ####   ######   #####  #    #  #####
 #       #          #    #    #  #    #
  ####   #####      #    #    #  #    #
      #  #          #    #    #  #####
 #    #  #          #    #    #  #
  ####   ######     #     ####   # v1
"

requirements() {
    # Updating System
    echo "Updating System"
    sudo apt update &> /dev/null

    echo "Installing Network Tools:"
    sudo apt install -y iputils-ping &> /dev/null

    # Check if Go is installed
    go_v=$(go version 2>/dev/null)
    if ! command -v go &> /dev/null; then
        echo "Go is not installed"
        echo "Installing Go now"
        sudo apt remove -y golang-go &> /dev/null
        sudo rm -rf /usr/local/go &> /dev/null
        wget https://go.dev/dl/go1.22.2.linux-amd64.tar.gz &> /dev/null
        sudo tar -xvf go1.22.2.linux-amd64.tar.gz -C /usr/local/ &> /dev/null
        export GOPATH=$HOME/go
        export PATH=$PATH:/usr/local/go/bin
        export PATH=$PATH:$GOPATH/bin
        source /etc/profile # to update your shell
    else
        echo -e "Go is already installed and your version is: ${go_v:13}"
    fi

    if ! command -v go &> /dev/null; then
        echo "If you get this message, run 'source /etc/profile' to update your shell and run again. # Go is installed, have a good day!"
        exit 1
    fi

    sudo apt install -y build-essential &> /dev/null

    # Check for the requirements
    if ! command -v git &> /dev/null || ! command -v ruby &> /dev/null || ! command -v rustc &> /dev/null || ! command -v python3 &> /dev/null; then
        echo "Git, Ruby, Rust, or Python is not installed. We will install them for you now."
        echo "Installing Git"
        sudo apt install -y git &> /dev/null
        echo "Installing Ruby"
        sudo apt install -y ruby-full &> /dev/null
        echo "Installing Rust"
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y &> /dev/null
        echo "Installing Python"
        sudo apt install -y python3 python3-pip &> /dev/null
    else
        echo -e "All requirements are already installed."
    fi
}

tools() {
    # Check if whatweb is installed
    if ! command -v whatweb &> /dev/null; then
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

    # Check if subfinder is installed
    if ! command -v subfinder &> /dev/null; then
        echo "Installing subfinder now"
        go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest &> /dev/null
        sudo cp $HOME/go/bin/subfinder /usr/local/bin
        echo "subfinder installation is done"
    else
        echo "subfinder is already installed"
    fi

    # Check if wafw00f is installed
    if ! command -v wafw00f &> /dev/null; then
        echo "Installing wafw00f now"
        sudo apt install -y wafw00f &> /dev/null
        echo "wafw00f installation is done"
    else
        echo "wafw00f is already installed"
    fi

    # Check if dirsearch is installed
    if ! command -v dirsearch &> /dev/null; then
        echo "Installing dirsearch now"
        pip install dirsearch &> /dev/null
        echo "dirsearch installation is done"
    else
        echo "dirsearch is already installed"
    fi

    # Check if cvemap is installed
    if ! command -v cvemap &> /dev/null; then
        echo "Installing cvemap now"
        go install github.com/projectdiscovery/cvemap/cmd/cvemap@latest &> /dev/null
        echo "cvemap installation is done"
    else
        echo "cvemap is already installed"
    fi

    # Check if sqlmap is installed
    if ! command -v sqlmap &> /dev/null; then
        echo "Installing sqlmap now"
        sudo apt install -y sqlmap &> /dev/null
        echo "sqlmap installation is done"
    else
        echo "sqlmap is already installed"
    fi

    # Check if qsreplace is installed
    if ! command -v qsreplace &> /dev/null; then
        echo "Installing qsreplace now"
        go install github.com/tomnomnom/qsreplace@latest &> /dev/null
        echo "qsreplace installation is done"
    else
        echo "qsreplace is already installed"
    fi

    # Check if kxss is installed
    if ! command -v kxss &> /dev/null; then
        echo "Installing kxss now"
        go install github.com/Emoe/kxss@latest &> /dev/null
        echo "kxss installation is done"
    else
        echo "kxss is already installed"
    fi

    # Check if httpx is installed
    if ! command -v httpx &> /dev/null; then
        echo "Installing httpx now"
        go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest &> /dev/null
        echo "httpx installation is done"
    else
        echo "httpx is already installed"
    fi

    # Check if searchsploit is installed
    if ! command -v searchsploit &> /dev/null; then
        echo "Installing searchsploit now"
        git clone https://www.github.com/Err0r-ICA/Searchsploit &> /dev/null
        cd Searchsploit
        bash install.sh &> /dev/null
        sudo cp Searchsploit /usr/local/bin/searchsploit &> /dev/null
        echo "searchsploit installation is done"
    else
        echo "searchsploit is already installed"
    fi

    # Check if massdns is installed
    if ! command -v massdns &> /dev/null; then
        echo "Installing massdns now"
        sudo apt install -y massdns &> /dev/null
        echo "massdns installation is done"
    else
        echo "massdns is already installed"
    fi

    # Check if nikto is installed
    if ! command -v nikto &> /dev/null; then
        echo "Installing nikto now"
        sudo apt install -y nikto &> /dev/null
        echo "nikto installation is done"
    else
        echo "nikto is already installed"
    fi

    # Check if dnsrecon is installed
    if ! command -v dnsrecon &> /dev/null; then
        echo "Installing dnsrecon now"
        sudo apt install -y dnsrecon &> /dev/null
        echo "dnsrecon installation is done"
    else
        echo "dnsrecon is already installed"
    fi

    # Check if sslyze is installed
    if ! command -v sslyze &> /dev/null; then
        echo "Installing sslyze now"
        pip install --upgrade pip setuptools wheel &> /dev/null
        pip install --upgrade sslyze &> /dev/null
        echo "sslyze installation is done"
    else
        echo "sslyze is already installed"
    fi
}

requirements
tools
