# Data Privacy Policy
## for Read-Only Jira Cloud Apps in the Atlassian Marketplace

### 1. Preface
We take data privacy and information security very serious. Protecting your data is our highest priority.

### 2. Scope and Definitions
This policy covers *Read-Only* Apps (**apps**)  
that are developed by Boran Gögetap and Contributors (**we**)  
for embedded use in Atlassian Cloud products (e.g. Jira),  
distributed via the Atlassian Marketplace or via Installation Links 
(e.g. [this one](https://developer.atlassian.com/console/install/b8f62955-0fb5-4796-8356-e034c3b34762?signature=12b3e11b37073e054e5b3a919421f140aa593d1541a88a1a95fcf7e6fcaa313d&product=jira)).

### 3. Contact
If you have questions or feedback about this policy or an **app** then please don't hesitate
to contact us via a communication channel that suits you: [http://www.goegetap.name/contact/](http://www.goegetap.name/contact/)

### 4. Read-Only Apps
Read-Only Apps read data from Jira in order to transform and display that data back to you.  
Data is displayed to you in the same browser window that you use to navigate Jira Cloud.

Read-Only Apps **never** write to Jira and **never** otherwise send data to any other server or service outside Jira Cloud.

Read-Only Apps may write log entries for the purpose of debugging or performance reviews.

Read-Only Apps may store configuration information or cache Jira information inside the Atlassian Cloud platform. 
This information is only accessible to the **app** itself, not to other apps and not to any user. Not even to **us**.

This way, there is no risk to the integrity or confidentiality of your data.

### 5. Use of Permissions
Every Atlassian Cloud app requests certain permissions so that it can work in the intended way.
Before you start using an app you can agree to, or refuse, these permissions.

Our **app** uses following Permissions for the documented purposes:

#### 5.1. View Jira issue data

The **app** reads information about Jira issues  
in order to transform and present that information back to you,  
e.g. in form of a diagram or other analysis.

#### 5.2. View active user profile

The **app** needs to act on behalf of you, the currently logged-in user,  
so that you see exactly the same amount of information in the app as you see in Jira (i.e. the same Jira projects and Jira issues).

The **app** actually does not read or otherwise use any of your profile details.

#### 5.3. Share data with 3 domains outside Atlassian

The **app** actually does **not share** data with anybody outside Atlassian.  

The **app** does:
* display images (issue type icons) from **your instance** in the Atlassian Cloud
* load a Javascript library to generate SVG diagrams, which comes in two parts:
* https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/index.js
* https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/graphviz.js

All in all, Atlassian counts that as "3 domains".  

Atlassian's wording of "share data with 3 domains" is a reference that it is technically possible to append information (e.g. as URL parameters)
while requesting images or Javascript libraries. This would be a way to leak data outside of Atlassian Cloud.
**Our app** does not do that.

Also, by loading images and Javascript libraries on your browser, 
the hosting websites receive information about the IP address (and potentially other headers) of your browser.

### 6. Use of Personal Data
**Our app** does not store any personal data.

### 7. Use of Cookies, Trackers or Analytics
**Our app** does not use any cookies, pixels, webfonts or other ways of trackers or analytics.

Please note that this statement does not apply to the Atlassian Cloud product.  
The Atlassian product's use of tracking technology (if any) is beyond **our** control.

### 8. Open Source

Full source code of **our app** is avavailable upon request.

This way you can very above statements, verify information security, or otherwise study our implementation.

### 9. Enjoy
We honestly hope that you enjoy **our app**.
Please contact us either way: to send feedback *or* to report problems with the app:
> [http://www.goegetap.name/contact/](http://www.goegetap.name/contact/)

~ Boran Gögetap & Contributors
