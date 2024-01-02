import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import itemsData from '../items.json';
import homeIntro from '../homeIntro.json';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  //float in
  const navigate = useNavigate();
  const project1DivRef = useRef(null);
  const project2DivRef = useRef(null);
  
  useEffect(() => {
    applyFloatInAnimation(project1DivRef);
    applyFloatInAnimation(project2DivRef);
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

  const handleViewCollection = (collection)=> {
    navigate (`/${collection}`)
  }

  //scroll intro pages
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) =>
        (prevIndex + homeIntro.intro.length - 1) % homeIntro.intro.length);
      
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % homeIntro.intro.length);

    }
  };

  return (
    <div className="home">
      <div className = "home__intro2">
        <div className = "home__intro2_info" >
          <h1> Find Your Favorites</h1>
          <h2> Duke's Day</h2>
          <button
            onClick={()=> handleViewCollection( `${homeIntro.intro[currentIndex].h6}` ) }>
            <h3> SHOP COLLECTION</h3>
          </button>
        </div>
        <img src = "/navy3.jpg"/>
      </div>
      <div className = "home__collections">
      <div className = "home__collections-header">
        <h1>All Play And No Work</h1>
        <h2 onClick={()=> handleViewCollection( 'costume' ) }
        >Olivia's Collection</h2>
      </div>
      <div className = "home__collections-whole floating-div" ref={project1DivRef}>
        <img className = "home__collections-main-img"  src="/ghost.jpg" alt="img1" />
        <div className="home__collections-4-items" >
           {itemsData.items
              .filter((item) => item.category === 'costume')
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
      </div>
      <div className="home__featured-products">
        <h1>Featured Products<br/></h1>
        <h2>Made to love – with love<br/></h2>
        <h3>JUNIPER GARDEN • BOSTON, MA, USA <br/> EST - 2017</h3>
      <div className="home__featured_products_items floating-div" ref={project2DivRef} >
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
    </div>
  );
};

export default HomePage;
