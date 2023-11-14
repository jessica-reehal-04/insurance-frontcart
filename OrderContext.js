import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState([]);
  const [userId, setUserId] = useState(3);
  const [policyAddOn,setPolicy]=useState([]);
  const [orderPrice,setOrderPrice]=useState(0);
  const [purchaseDate, setPurchaseDate] = useState("2023-09-19");

  const [udm, setUdm] = useState({
    userName: '',
    age: 0,
    isTobaccoConsumer: false,
    doesUserDrink: false,
    nomineeName: '',
    nomineeAge: 0,
    nomineeRelation: ''
  });

  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8070/shoppingcart/2/buyCart');
        setCart(response.data);
        setOrderPrice(calculateTotalOrderPrice());
        console.log(orderPrice)
       

      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }; 

    fetchCartItems();
  }, []);
//   console.log(cart)

  const calculateTotalOrderPrice = () => {
    return cart?.policies?.reduce((total, policy) => total + policy.policyPrice, 0) || 0;
  };
  

 
//   console.log(orderPrice)
  const addOrder = () => {
    const totalOrderPrice = calculateTotalOrderPrice();
    
    // console.log(totalOrderPrice)

    // const newOrder = {
    //   userId,
    //   purchaseDate,
    //   policyAddOn: cart?.policies || [],
    //   udm,
    //   orderPrice: totalOrderPrice,
    // };

    // setOrder((prevOrder) => [...prevOrder, newOrder]);

    let policyArray=[]
    let res=0;
    cart.policies.forEach(element => {
        policyArray.push({
            "policyId":element.policyId,
            "price":element.policyPrice
        })
       
      
       res+=element.policyPrice
       
    });
    
   
    
    setPolicy((prevPolicyAddOn) => {
      
        const updatedPolicyAddOn = [...prevPolicyAddOn, ...policyArray];
       
        return updatedPolicyAddOn;
      });
  
      
      setOrder((prevOrder) => {

        const updatedOrder = [
          ...prevOrder,
          { userId, purchaseDate, policyAddOn: [...policyArray], udm, orderPrice:res },
        ];
        console.log(updatedOrder[0]);

        const headers = {
            'Content-Type': 'application/json', 
            
          };
          
     axios.post("http://localhost:8020/order/addOrderWithUserDetails", updatedOrder[0],{headers}).then((response) => {
        console.log(response.status);
      });
      })

    
    // setUdm({
    //   userName: '',
    //   age: 0,
    //   isTobaccoConsumer: false,
    //   doesUserDrink: false,
    //   nomineeName: '',
    //   nomineeAge: 0,
    //   nomineeRelation: '',
    // });
  };

  const contextValue = {
    cart,
    order,
    userId,
    purchaseDate,
    udm,
    addOrder,
    setUdm,
    orderPrice
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}  
    </OrderContext.Provider>
  );
};
