import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ethers } from 'ethers';
import OrderModal from './OrderModal';
import itemsData from '../items.json';
import Overlay from './Overlay';
import Juniper from '../abis/Juniper.json';

const MyItem = ({ itemId }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [contractAddress, setContractAddress] = useState('0x55f13B08056e14C9A31453CfF7cE9475e56BcF6C');
  const [link, setLink] = useState('https://sepolia.etherscan.io/')
  const navigate = useNavigate();
  const item = itemsData.items[itemId - 1];
  const category = item.category;
  let myNetwork
  let size;


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClose = () => {
    setIsOrderModalOpen(false);
    setIsSuccessful(false);
  };

  const handleAddToBag = async () => {
    setIsOrderModalOpen(true);

    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const weiValue = ethers.utils.parseEther(item.cost);
        const network = await provider.getNetwork();
        console.log('Processing...');

          if (network.chainId === 31337 ){
             setContractAddress('0x49fd2BE640DB2910c2fAb69bB8531Ab6E76127ff');
             myNetwork = "etherscan.io/tx/";
          }
          else if ( network.chainId === 5){
             setContractAddress('0x722B94F797aF487d762C05cf8143a68f65B4Bb37');
             myNetwork = "https://goerli.etherscan.io/tx/";
          }
          else if ( network.chainId === 80001){
             setContractAddress('0xB59eedd21C653AA2f7e03f9461bBb718179EC8aC');
             myNetwork = "mumbai.polygonscan.com/tx/";
          }
          else {
             setContractAddress('0x55f13B08056e14C9A31453CfF7cE9475e56BcF6C');
             myNetwork = "sepolia.etherscan.io/tx/";
          }

        const contractAbi = Juniper.abi;
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const transaction = await contract.connect(signer).buy(item.id, { value: weiValue});
        await transaction.wait();
        const receipt = await transaction.wait();
        const hash = receipt.transactionHash;
        console.log('Transaction Successful:', hash);
        setLink(`https://${myNetwork}${hash}`)
        setIsSuccessful(true);
      } catch (error) {
        if (error.message.includes('Insufficient funds')) {
          alert('Sorry. You have insufficient funds to purchase this item.');
          handleClose();
        } else {
          console.error('Error sending transaction:', error);
          alert('Transaction failed. Please try again.');
          handleClose();
        }
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to make a transaction.');
    }
  };

  const handleContainerClick = (item) => {
    navigate(`/${item.category}/${item.name}`);
    window.scrollTo(0, 0);
  };

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  var sizes = ['xs', 's', 'm', 'l', 'xl'];


  return(
    <div className="myitem">
      <div className="item__main">
        <div className="item__img">
          <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.name}.jpg`} />
        </div>
        <div className="item__details">
          <h1>{item.name}</h1>
          <h2>{item.cost} ETH</h2>
          <h3>size</h3>
          <div className="item__details__size">
        {sizes.map((size, index) => (
          <h3
            key={size}
            className={size === selectedSize ? 'selected' : ''}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </h3>
        ))}
          </div>
          <div className="item__detail_add_to_bag">
            {item.stock >= 1 ? 
            <button onClick={handleAddToBag}>
              <h1>add to bag</h1></button> :
            <h2>Sold Out</h2> }
          </div>
          <div className="item__detail_rating same_line">
            <h4>RATING</h4>
            <div>
              <img src={item.rating >= 5 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 4 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 3 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 2 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 1 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
            </div>
          </div>
          <div className="item__detail_share same_line">
            <h5>SHARE</h5>
            <div>
              <a href= "https://www.instagram.com" target ="_blank" rel="noreferrer"> <img src={'/instagram.png'} alt = "website"/></a>
              <a href= "https://www.pinterest.com" target ="_blank" rel="noreferrer"> <img src={'/pinterest.png'} alt = "website" /></a>
              <a href= "https://www.twitter.com" target ="_blank" rel="noreferrer"> <img src={'/twitter.png'} alt = "website" /></a>
              <a href= "https://www.facebook.com" target ="_blank" rel="noreferrer"> <img src={'/facebook.png'} alt = "website" /></a>
            </div>
          </div>
          <div className=" same_line">
            <h6>AVAILABILITY </h6> 
            {item.stock >= 1 ?  <h6>Available</h6>  : <h6>Currently Unavailable</h6>}
          </div>
          <div className=" same_line">
            <h6>VENDOR  </h6>
            <h6>{item.vendor}</h6>
          </div>
          <div className=" same_line">
            <h6>SHIPS FROM </h6>
             <h6>Boston</h6>
          </div>
          <div className=" same_line">
            <h6>COLOR</h6>
             <h6>{item.color}</h6>
          </div>
        </div>
      </div>
      <div>
        <h1>You might also like...</h1>
        <div className="category__individual_items also_like" >
          {itemsData.items
          .filter((item) => item.category === category)
          .slice(0,4)
          .map((item) => (
            <div key={item.id} 
              className="ITEM-CONTAINER" 
              onClick={()=> handleContainerClick(item)}>
              <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.id}.jpg`} />
              <h5>{item.name}</h5>
              <h6>{item.cost} ETH</h6>
            </div>
          ))}
        </div>
      </div>
      {isOrderModalOpen && (
        <>
          < Overlay onClose= {handleClose}/>
          <OrderModal 
            item = {item}
            isOpen={isOrderModalOpen}
            onClose= {handleClose}
            isSuccessful = {isSuccessful}
            link={link}
          />

        </>
      )}
    </div>
  );
};

export default MyItem;
