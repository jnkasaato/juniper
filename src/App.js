import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Category from './pages/Category';
import MyItem from './pages/MyItem';
import itemsData from './items.json';


const App = () => {
    const [userAddress, setUserAddress] = useState(null);
    const [networkStatus, setNetworkStatus] = useState('Network');
    const [isWalkMenuOpen, setIsWalkMenuOpen] = useState(false);
    const [isWearMenuOpen, setIsWearMenuOpen] = useState(false);
    const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
    const [isGroomMenuOpen, setIsGroomMenuOpen] = useState(false);
    const [isTravelMenuOpen, setIsTravelMenuOpen] = useState(false);
    const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const toggleWalkMenu = () => {
        setIsWalkMenuOpen(!isWalkMenuOpen);
    };

    const toggleWearMenu = () => {
        setIsWearMenuOpen(!isWearMenuOpen);
    };

    const toggleFoodMenu = () => {
        setIsFoodMenuOpen(!isFoodMenuOpen);
    };

    const togglePlayMenu = () => {
        setIsPlayMenuOpen(!isPlayMenuOpen);
    };

    const toggleTravelMenu = () => {
        setIsTravelMenuOpen(!isTravelMenuOpen);
    };

    const toggleGroomMenu = () => {
        setIsGroomMenuOpen(!isGroomMenuOpen);
    };

    const handleSubscribe = () => {
        setIsSent(true);
    };

    //connect metamask
    const connectToMetaMask = async () => {
        try {
            if (window.ethereum) {
                if (!userAddress) {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setUserAddress(accounts[0]);
                } else {
                    await window.ethereum.request({ method: 'eth_accounts' });
                    setUserAddress(null);
                }
            } else {
                alert('MetaMask is not installed. Please install MetaMask to connect.');
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    };

    useEffect(() => {
        connectToMetaMask();
    }, []);

    const handleNetworkStatusChange = async (id) => {
        try {

            if (window.ethereum) {
                if (userAddress) {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: `${id}` }],
                    });
                    setNetworkStatus('Sepolia');
                } else {

                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setUserAddress(accounts[0]);
                }
            } else {
                alert('MetaMask is not installed. Please install MetaMask to connect.');
            }
        } catch (error) {
            console.error('Error handling network status change:', error);
            alert('Failed to switch network. Please try again.');
        }
    };

    return (
      <div className="app">
        <h2 className="app__welcome">Welcome to Juniper Garden! Shop Now</h2>
        <Router>
          <div className="nav__branding">
            <div>
              <div className="nav__links">
                <ul>
                  <li onMouseEnter={togglePlayMenu} onMouseLeave={togglePlayMenu}>
                    <Link to="/play" className="nav-link" ><h2>Play</h2></Link>
                    {isPlayMenuOpen && (
                      <ul className="nav__dropdown_menu">
                        <Link to="/play">Shop All</Link>
                      </ul>
                    )}
                  </li>
                  <li onMouseEnter={toggleFoodMenu} onMouseLeave={toggleFoodMenu}>
                    <Link to="/food" className="nav-link" ><h2>Eat</h2></Link>
                    {isFoodMenuOpen && (
                      <ul className="nav__dropdown_menu">
                        <Link to="/meal">Meals</Link>
                        <Link to="/treat">Treats</Link>
                      </ul>
                    )}
                  </li>
                  <li onMouseEnter={toggleWalkMenu} onMouseLeave={toggleWalkMenu} >
                    <Link to="/walk" className="nav-link" ><h2>Walk</h2></Link>
                    {isWalkMenuOpen && (
                      <ul className="nav__dropdown_menu">
                        <Link to="/harness">Harnesses</Link>
                        <Link to="/ipfs/bafybeifhdqvesmumzcjilbyc37n7mbjhuz3xinls3eo47pccwyph7ybksi/collar">Collars</Link>
                        <Link to="/leash">Leashes</Link>
                      </ul>
                    )}
                  </li>
                  <li onMouseEnter={toggleWearMenu} onMouseLeave={toggleWearMenu} >
                    <Link to="/wear" className="nav-link"><h2>Wear</h2></Link>
                    {isWearMenuOpen && (
                      <ul className="nav__dropdown_menu">
                        <Link to="/costume">Costumes</Link>
                        <Link to="/bandana">Bandanas</Link>
                        <Link to="/bow">Bows</Link>
                      </ul>
                    )}
                  </li>
                  <li onMouseEnter={toggleGroomMenu} onMouseLeave={toggleGroomMenu}>
                    <Link to="/groom" className="nav-link"><h2>Groom</h2></Link>
                    {isGroomMenuOpen && (
                      <ul className="nav__dropdown_menu">
                        <Link to="/groom">Shop All</Link>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/" className="nav-link" ><h1>Juniper Garden</h1></Link>
            <div className="nav__connect">
              {userAddress ? (
                <>
                  <button onClick={connectToMetaMask}>
                    <h2>{userAddress.slice(0, 4)}...{userAddress.slice(-4)}</h2>
                  </button>
                </>
              ) : (
                <button className="nav__disconnect" onClick={connectToMetaMask}>
                  {userAddress ? (
                    <h2>{userAddress.slice(0, 4)}...{userAddress.slice(-4)}</h2>
                  ) : (
                    <h2>Connect</h2>
                  )}
                </button>
              )}
     
          <select className="network" onChange={(event) => handleNetworkStatusChange(event.target.value)}>
            <option value="0x5">Goerli</option>
            <option value="0xAA36A7">Sepolia</option>
            <option value="0x13881">Mumbai</option>
            <option value="0x7A69">Localhost</option>
          </select>

        </div>
        </div>
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play/*" element={<Category category="play" />} />
            <Route path="/groom/*" element={<Category category="groom" />} />
            <Route path="/food/*" element={<Category category="food" />} />
            <Route path="/meal/*" element={<Category category="meal" />} />
            <Route path="/treat/*" element={<Category category="treat" />} />
            <Route path="/walk/*" element={<Category category="walk" />} />
            <Route path="/harness/*" element={<Category category="harness" />} />
            <Route path="/ipfs/bafybeifhdqvesmumzcjilbyc37n7mbjhuz3xinls3eo47pccwyph7ybksi/collar/*" element={<Category category="collar" />}/>
            <Route path="/leash/*" element={<Category category="leash" />}/>
            <Route path="/costume/*" element={<Category category="costume" />} />
            <Route path="/bandana/*" element={<Category category="bandana" />} />
            <Route path="/bow/*" element={<Category category="bow" />} />
            <Route path="/wear/*" element={<Category category="wear" />} />
            <Route path="/travel/*" element={<Category category="travel" />} />
            
            {itemsData.items.map((item) => (
              <Route
                key={item.id}
                path={`/${item.category}/${item.name}`}
                element={<MyItem itemId={item.id} />}
              />
            ))}
          </Routes>
          <div className="footer">
            <div className="footer__subscribe">
              <h1>Subscribe</h1>
              <p>
                Welcome to the Juniper Garden, a delightful online pet store where you can explore a vibrant collection of pet essentials and accessories. Whether you're a pet parent or a pet lover, our app offers a wide range of grooming, apparel, and travel products to cater to your furry friend's every need. <br/><br/> Subscribe to stay up to date:
              </p>
              <p>
                <input type="email" className="contact__input" placeholder="Your email address" />
                <button className="subscribe-button" onClick={handleSubscribe}>
                  {isSent ? 'Sent' : 'Subscribe'}
                </button>
              </p>
              <h3>Juniper Garden EST. 2017</h3>
            </div>
            <div className="footer__menu">
              <h1>Menu</h1>
              <div className="footer__menu_links">
                <Link to="/harness" ><h2>Harness</h2></Link>
                <Link to="/food" ><h2>Food</h2></Link>
                <Link to="/meal" ><h2>Meals</h2></Link>
                <Link to="/treat" ><h2>Treats</h2></Link>
                <Link to="/walk" ><h2>Walk</h2></Link>
                <Link to="/harness" ><h2>Harnesses</h2></Link>
                <Link to="/collar"  ><h2>Collars</h2></Link>
                <Link to="/leash"  ><h2>Leashes</h2></Link>
                <Link to="/wear" ><h2>Wear</h2></Link>
                <Link to="/costume"  ><h2>Costumes</h2></Link>
                <Link to="/bandana"  ><h2>Bandanas</h2></Link>
                <Link to="/bow"  ><h2>Bows</h2></Link>
                <Link to="/travel" ><h2>Travel</h2></Link>
                <Link to="/groom" ><h2>Groom</h2></Link>
              </div>
              <p>
                Here you'll discover an array of carefully curated categories designed to make your shopping experience a breeze. From delectable pet food options to stylish wearables and travel essentials, our menu ensures you find the perfect products to pamper your beloved pets.
              </p>
            </div>
          </div>
        </Router>
      </div>
    );
};

export default App;