import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import itemsData from '../items.json';

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const floatIn0 = useRef(null);
    const floatIn1 = useRef(null);
    const floatIn2 = useRef(null);
    const floatIn3 = useRef(null);
    const floatIn4 = useRef(null);
    const floatIn5 = useRef(null);
    const floatIn6 = useRef(null);
    const floatIn7 = useRef(null);

    useEffect(() => {
        applyFloatInAnimation(floatIn0);
        applyFloatInAnimation(floatIn1);
        applyFloatInAnimation(floatIn2);
        applyFloatInAnimation(floatIn3)
        applyFloatInAnimation(floatIn4);
        applyFloatInAnimation(floatIn5);
        applyFloatInAnimation(floatIn6);
        applyFloatInAnimation(floatIn7);
    }, []);

    const applyFloatInAnimation = (divRef) => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                divRef.current.classList.add('float-in');
            }
        });
        observer.observe(divRef.current);
        return () => {
            observer.disconnect();
        };
    };

    //navigate pages
    const handleContainerClick = (item) => {
        navigate(`/${item.category}/${item.name}`);
    };

    const handleViewCollection = (collection) => {
        navigate(`/${collection}`)
    }



    return (
        <div className="home">
      <div className = "home__intro">
        <div className = "home__intro_info floating-div" ref={floatIn0}>
          <h1> Find Your Favorites</h1>
          <h2> Duke's Day Out</h2>
          <button
            onClick={()=> handleViewCollection('play') }>
            <h3> SHOP COLLECTION</h3>
          </button>
        </div>
        <img src = "/navy3.jpg"/>
      </div>
      <div className = "home__spotlight floating-div" ref={floatIn5} >
        <div className = "home__spotlight_text" >
          <h1>Step Out In Style</h1>
          <p>Step out in style with our adorable dog bows that turn every walk into a fashion runway for your furry friend! Let your pup strut their stuff with our playful and charming bows, designed to add a touch of whimsy to their wardrobe. </p>
          <button onClick={()=> handleViewCollection( 'bow' ) }>Shop Collection</button>
           </div>
      <div className = "home__spotlight_items" >
        {itemsData.items
            .filter((item) => item.category === 'bow')
            .slice(2-5)
            .map((item) => (
          <div
            key={item.id}
            onClick={() => handleContainerClick(item)} 
            className="ITEM-CONTAINER"
          >
            <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.name}.jpg`} />
            <h5>{item.name}</h5>
            <h6>{item.cost} ETH</h6>
          </div>
         ))}
        </div>
      </div>
      <div className = "home__collections">
      <div className = "home__collections-header floating-div" ref={floatIn3}>
        <h1 >All play and no work</h1>
        <button onClick={()=> handleViewCollection( 'costume' ) }
        >Olivia's Collection</button>
      </div>
      <div className = "home__collections-whole floating-div" ref={floatIn1}>
        <img className = "home__collections-main-img"  src="/ghost.jpg" alt="img1" />
        <div className="home__collections-4-items" >
           {itemsData.items
              .filter((item) => item.category === 'costume')
              .map((item) => (
            <div
              key={item.id}
              onClick={() => handleContainerClick(item)} 
              className="ITEM-CONTAINER">
              <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.name}.jpg`} />
              <h5>{item.name}</h5>
              <h6>{item.cost} ETH</h6>
            </div>
          ))}
          </div>
        </div>
      </div> 
      <div className = "home__spotlight floating-div white" ref={floatIn6} >
        <div className = "home__spotlight_text" >
          <h1>Treats Treats Treats</h1>
          <p>Treat your fur-baby to a taste sensation with our delectable dog treats! Our curated selection of mouthwatering goodies is not only a delight for your pup's taste buds but also a celebration of their good behavior. From savory bites to sweet delights, your pup wont be able to get enough.</p>
          <button onClick={()=> handleViewCollection( 'treat' ) }>Shop Collection</button>
        </div>
        <div className = "home__spotlight_items" >
          {itemsData.items
            .filter((item) => item.category === 'treat')
          .slice(2-5)
          .map((item) => (
          <div
            key={item.id}
            onClick={() => handleContainerClick(item)} 
            className="ITEM-CONTAINER">
            <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.name}.jpg`} />
            <h5>{item.name}</h5>
            <h6>{item.cost} ETH</h6>
          </div>
         ))}
        </div>
      </div>
      <div className="home__background">
      <div className="home__featured-products">
        <h1>Featured Products<br/></h1>
        <h2>Made to love – With love<br/></h2>
        <h3>Louis & Co. • BOSTON, MA, USA <br/> EST - 2017</h3>
      <div className="home__featured_products_items floating-div" ref={floatIn2} >
         {itemsData.items
            .filter((item) => item.category === 'bandana')
            .slice(11-16)
            .map((item) => (
          <div
            key={item.id}
            onClick={() => handleContainerClick(item)} 
            className="ITEM-CONTAINER"
          >
            <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.name}.jpg`} />
            <h5>{item.name}</h5>
            <h6>{item.cost} ETH</h6>
          </div>
         ))}
        </div>
      </div>
      <div className = "home__spotlight floating-div" ref={floatIn4} >
        <div className = "home__spotlight_text" >
          <h1>Pampered Life</h1>
          <p>Elevate your pup's pampering experience with our grooming extravaganza! Dive into a world of fluff and fabulousness as we offer a range of grooming services that will have your furry friend looking and feeling like a true canine celebrity.</p>
          <button onClick={()=> handleViewCollection( 'groom' ) }>Shop Collection</button>
        </div>
        <div className = "home__spotlight_items" >
          {itemsData.items
            .filter((item) => item.category === 'groom')
          .slice(2-5)
          .map((item) => (
          <div
            key={item.id}
            onClick={() => handleContainerClick(item)} 
            className="ITEM-CONTAINER">
            <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.name}.jpg`} />
            <h5>{item.name}</h5>
            <h6>{item.cost} ETH</h6>
          </div>
         ))}
        </div>
      </div>
    </div>


      <div className = "home__spotlight floating-div white" ref={floatIn7} >
        <div className = "home__spotlight_text" >
          <h1>Jetsetter's Guide</h1>
          <p>Embark on your next adventure with Louis & Co — where style meets functionality. Our meticulously crafted travel bags are designed to accompany you on every journey, boasting spacious compartments and durable materials for maximum convenience and durability.</p>
          <button onClick={()=> handleViewCollection( 'travel' ) }>Shop Collection</button>
        </div>
        <div className = "home__spotlight_items" >
          {itemsData.items
            .filter((item) => item.category === 'travel')
          .slice(2-5)
          .map((item) => (
          <div
            key={item.id}
            onClick={() => handleContainerClick(item)} 
            className="ITEM-CONTAINER">
            <img src={`/items/img${item.id}.jpg`} alt={`/assets/img${item.name}.jpg`} />
            <h5>{item.name}</h5>
            <h6>{item.cost} ETH</h6>
          </div>
         ))}
        </div>
      </div>
    </div>
    );
};

export default HomePage;