
import React from 'react'

function Footer() {
    return (
        <footer style={{backgroundColor:"#FBFBFB"}}>
        <div className='container border-top mt-5' >
            <div className="row mt-5">
                <div className="col">
                    <img src="media/images/logo.png" alt=""  style={{ width: "50%" }} />
                    <p>© 2010 - 2025, Tradex GmbH All rights reserved.</p>
                </div>
                <div className="col">
                    <p>Company</p>
                    <ul style={{ listStyleType: "none", padding: 0}}>
                        <li style={{textDecoration:"none"}}><a href="#">About</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Philosophy</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Press & media</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Careers</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Zerodha Cares (CSR)</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Zerodha.tech</a></li>
                    </ul>
                </div>
                <div className="col">
                    <p>Support</p>
                    <ul style={{ listStyleType: "none", padding: 0}}>
                        <li style={{textDecoration:"none"}}><a href="#">Contact us</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Support portal</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">How to file a complaint?</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Status of your complaints</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Bulletin</a></li>
                        <li style={{textDecoration:"none"}}><a href="#">Circular</a></li>
                    </ul>
                </div>

                <div className="col ">
                    <p>Account</p>
                     <ul style={{ listStyleType: "none", padding: 0}}>
                              <li style={{textDecoration:"none"}}><a href="#">Open demat account</a></li>
                              <li style={{textDecoration:"none"}}><a href="#">Minor demat account</a></li>
                              <li style={{textDecoration:"none"}}><a href="#">NRI demat account</a></li>
                              <li style={{textDecoration:"none"}}><a href="#">Commodity</a></li>
                              <li style={{textDecoration:"none"}}><a href="#">Dematerialisation</a></li>
                              <li style={{textDecoration:"none"}}><a href="#">Fund transfer</a></li>
                    </ul>
                </div>
            </div>
       <p className='text-muted fs-7'>TradEx GmbH: Authorized by BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) – Registration no.: DE-TX-2019-001. Member of Deutsche Börse, XETRA & Eurex. Depository services through TradEx Securities GmbH – BaFin Registration no.: DE-DP-431-2019. Commodity Trading through TradEx Commodities GmbH. Eurex: 46025; BaFin Registration no.: DE-COM-038238. Registered Address: TradEx GmbH, Friedrichstraße 95, 10117 Berlin, Germany. For any complaints pertaining to securities trading please write to complaints@tradex.de, for depository related queries to depot@tradex.de. Please ensure you carefully read the Risk Disclosure Document as prescribed by BaFin | MiFID II</p>

<p className='text-muted fs-7' >Procedure to file a complaint with BaFin: Register on BaFin portal. Mandatory details for filing complaints: Name, Tax ID, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of grievances through German regulatory framework.</p>

Online Dispute Resolution | Grievances Redressal Mechanism

Investments in securities markets are subject to market risks; read all related documents carefully before investing.

<p className='text-muted fs-7' >Attention investors: 1) Securities brokers can accept securities as collateral from clients only through authorized depository systems as per German regulations. <br /> 2) Update your e-mail and phone number with your broker and receive OTP directly from depository on your registered contact details. <br /> 3) Check your securities / funds / bonds in the consolidated account statement issued monthly by Clearstream/Eurex Clearing.</p>

<p className='text-muted fs-7'>Germany's leading discount broker based on client assets under management. Deutsche Börse member factsheet available.

"Prevent unauthorised transactions in your account. Update your contact details with your broker. Receive transaction confirmations directly from the exchange. Issued in the interest of investors. KYC is a one-time process - once completed through a BaFin registered intermediary, you need not repeat it with other authorized intermediaries." Dear Investor, for IPO subscriptions, direct bank authorization is sufficient. Please provide your IBAN and authorize your bank for payment in case of allocation. Unallocated funds remain in your account. As a business policy, we don't provide investment advice and have not authorized third parties to trade on behalf of clients. If someone claims to represent TradEx and offers such services, please report it immediately.
</p>
</div>
</footer>
    );
}

export default Footer;