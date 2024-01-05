import React, { useRef, useState, useEffect } from 'react';
import itemsData from '../items.json';
import { useNavigate } from 'react-router-dom';

const Category = ({ category }) => {
    const [selectedColor, setSelectedColor] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(false);
    const [sortOption, setSortOption] = useState('default'); 
    const [gridColumns, setGridColumns] = useState(3);
    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingIn(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    

    // filter category
    let filteredItems = [];
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

    const handleGoHere = (link) => {
        navigate(`${link}`);
    };


    const handleSortChange = (option) => {
        setSortOption(option);
    };
    const sortedItems = [...filteredItems];
    const navigate = useNavigate();

    if (sortOption === 'alphabetical') {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'alphabetical-reverse') {
      sortedItems.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'reverse-default') {
      sortedItems.reverse();
    }



    const handleColumnClick = (columns) => {
      setGridColumns(columns);
      
    };



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
        <p  onClick={()=> handleGoHere(`/${category}`) } > 
          {category}</p>
      </div>
      <div className="category__main">
        <div className="category__list_items" >
          <h3 className="category__title" >{category}</h3>
          <div className="category__subtitle" >
            <div className="category__columns ">
            <h1>columns</h1>
                <select className="network" value={gridColumns} onChange={(e) => handleColumnClick(e.target.value)}>
                  <option value="2">2</option>
                  <option value="3">3 </option>
                  <option value="4">4 </option>
                </select>
              </div>
            <div className="category__sortby" >
              <h1>sortby</h1>
            <select className="network" value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="default">Recommended</option>
              <option value="alphabetical">Alphabetical A-Z</option>
              <option value="alphabetical-reverse">Alphabetical Z-A </option>
              <option value="reverse-default">Best Selling</option>
            </select>
              </div>
          </div>
          {filteredItems.length === 0 ? (
            <p>Sorry, there are no items in this selection.</p>
          ) : (
            <div className={`category__individual_items columns-${gridColumns}`} >
              {sortedItems.map((item) => (
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
          )}
        </div>
      </div>
    </div>
    );
};

export default Category;