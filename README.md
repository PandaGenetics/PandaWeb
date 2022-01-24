## PandaWeb tutorial

* How to run
* How to develop
* How to test
* How to PR (pull request)
* How to follow


```bash
# Download nginx install package
wget https://nginx.org/download/nginx-1.20.1.tar.gz

# Decompression
tar -xvf nginx-1.20.1.tar.gz 

# configuration and install
cd nginx-1.20.1/
./configure --prefix=/usr/local/nginx
sudo make
sudo make install

# start serve
sudo /usr/local/nginx/sbin/nginx 

# stop serve
sudo /usr/local/nginx/sbin/nginx -s stop
```



## Nginx Configuration

> cd into /usr/local/nginx/conf file
>
> Open nginx.conf file， vim nginx.conf

![截屏2021-08-25 上午10.23.08](https://th.bing.com/th/id/OIP.V6BPsj0qgAVakEIOPdC6tAHaDt?pid=ImgDet&rs=1)
<center><img src="https://th.bing.com/th/id/OIP.V6BPsj0qgAVakEIOPdC6tAHaDt?pid=ImgDet&rs=1" /> </center>

> 1. Change the "listen" to 80 port in server configuration
> 2. Put the Web page into the HTML directory, then change the name of the web file to index.html. 
> 3. Restart Nginx
> 4. Then you will open th web page after access the current IP address. If there are no web page displayed, the firewall may be disabled.

Here is the Fire configuration

````bash
# Firewall Configuration
cat /etc/sysconfig/iptables-config
# Restart Firewall, Load Configuration
systemctl start iptables
# Ver
cat /proc/version		uname -a
# start, Reload, Stop, Check防火墙
systemctl start/reload/stop/status firewalld

root needed
# Enable the firewall for the specified port
firewall-cmd --zone=public --add-port=80/tcp --permanent
# Disable the firewall for the specified port
firewall-cmd --zone=public --remove-port=8081/tcp --permanent 
# Reload the Firewall Configuration
firewall-cmd --reload   
# Check all the enable ports
firewall-cmd --list-ports   
````

