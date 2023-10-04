import React, {useRef, useState, useEffect } from 'react';
import itemsData from '../items.json';
import {useNavigate} from 'react-router-dom';

const Category = ({ category  }) => {
  const [selectedColor, setSelectedColor] = useState(false); 
  const [isFadingIn, setIsFadingIn] = useState(false); 
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  let filteredItems = [];

  // filter category
  if (category === 'walk') {
    filteredItems = itemsData.items.filter(
      (item) => item.category === 'collar' || item.category === 'leash' || item.category === 'harness'
    );
  } else if (category === 'wear') {
    filteredItems = itemsData.items.filter(
      (item) => item.category === 'bandana' || item.category === 'costume' || item.category === 'bow'
    );
  } else if (category === 'food') {
    filteredItems = itemsData.items.filter(
      (item) => item.category === 'meal' || item.category === 'treat'
    );
  } else {
    filteredItems = itemsData.items.filter((item) => item.category === category);
  }

  if (selectedColor) {
    filteredItems = filteredItems.filter(
      (item) => item.color === selectedColor
    );
  }

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  var colorOptions = [
    'pink', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'black', 'brown', 'pattern'
  ];

  const handleContainerClick = (item) => {
    navigate(`/${item.category}/${item.name}`);
    window.scrollTo(0, 0);
  };

  const handleGoHere = (link)=>{
    navigate(`${link}`);
  };

  const project1DivRef = useRef(null);
  useEffect(() => {
    applyFloatInAnimation(project1DivRef);
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

  return (
    <div className="category">
      <div className="category__partition">
        <p
          onClick={()=> handleGoHere('/') } >
          home/ </p>
        <p onClick={()=> handleGoHere(`/${category}`) } > 
          {category}</p>
      </div>
      <div className="category__main">
        <div className="category__options">
          <div className="category__options_color">
            <div className="category__options_color_header">
              <h1>COLORS</h1>
              <h3>-</h3>
            </div>
            <div className="category__options_list_color">
              {colorOptions.map((color, index) => (
                <h2 key={index} onClick={() => handleColorClick(color)}>{color}</h2>
              ))}
            </div>
          </div>
          <div className="category__options_size">
            <div className="category__options_size_header">
              <h1>SIZE</h1>
              <h3>-</h3>
            </div>
            <h2>XSMALL</h2>
            <h2>SMALL</h2>
            <h2>MEDIUM</h2>
            <h2>LARGE</h2>
            <h2>XLARGE</h2>
          </div>
        </div>
        <div className={`category__list_items  ${isFadingIn ? 'fade-in' : ''}`} ref={project1DivRef}>
          <h3>{category}</h3>
          {filteredItems.length === 0 ? (
            <p>Sorry, there are no items in this selection.</p>
          ) : (
            <div className="category__individual_items">
              {filteredItems.map((item) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
