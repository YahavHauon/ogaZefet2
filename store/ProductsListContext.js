import React, {createContext, useState} from 'react';

import axios from 'axios';
import {useMutation, useQuery} from 'react-query';
import Toast from 'react-native-toast-message';

export const ProductList = createContext({
  id: '',
  productList: [],
  filterList: [],
  rawMaterialList: [],
  packagingList: [],
  decorationsList: [],
  rawMaterialListFiltered: [],
  packagingListFiltered: [],
  decorationsListFiltered: [],
  favArray: [],
  setId: () => {},
  addFavArray: () => {},
  removeFavArray: () => {},
  addProductList: () => {},
  setFilterList: () => {},
  deleteProductList: () => {},
  copyProductList: () => {},
  updateProductList: () => {},
  addRawMaterial: () => {},
  setRawMaterialListFiltered: () => {},
  deleteRawMaterial: id => {},
  copyRawMaterial: () => {},
  updateRawMaterial: () => {},
  addDecorations: () => {},
  setDecorationsListFiltered: () => {},
  deleteDecorations: id => {},
  copyDecorations: () => {},
  updateDecorations: () => {},
  addPackaging: () => {},
  setPackagingListFiltered: () => {},
  deletePackaging: id => {},
  copyPackaging: () => {},
  updatePackaging: () => {},
  filterListHandler: () => {},
});

const ProductListProvider = ({children}) => {
  const [id, setId] = useState('');
  const {isFetching, mutate, isSuccess, isError} = useMutation(
    async () => {
      const stringed = JSON.stringify([]);
      console.log(id);
      return await axios.post(
        `http://51.195.61.125:27004/api/user/32/add/1`,
        [],
      );
    },
    {
      onSuccess: res => {
        console.log('succ');
      },
      onError: err => {
        console.log('err');
      },
    },
  );
  const [productList, setProductList] = useState([
    {
      id: '1',
      name: 'טסט',
      cost: '52.90',
      selected: ['0', '5', '6'],
      hoursWorked: '5',
      hourValue: '24',
      gettingPayed: '240',
    },
    {
      id: '2',
      name: 'טסט2',
      cost: '72.90',
      selected: ['0', '4', '3'],
      hoursWorked: '3',
      hourValue: '24',
      gettingPayed: '340',
    },
    {
      id: '3',
      name: 'עוגת גן 123',
      cost: '92.90',
      selected: ['0', '5', '2'],
      hoursWorked: '1',
      hourValue: '12',
      gettingPayed: '500',
    },
    {
      id: '4',
      name: 'טסט',
      cost: '100.50',
      selected: ['0', '1', '7'],
      hoursWorked: '5',
      hourValue: '24',
      gettingPayed: '240',
    },
    {
      id: '5',
      name: 'טסט2',
      cost: '1.90',
      selected: ['0', '1', '4'],
      hoursWorked: '8',
      hourValue: '30',
      gettingPayed: '440',
    },
    {
      id: '6',
      name: 'עוגה מזולפת אדומה',
      cost: '22.49',
      selected: ['5', '1', '2'],
      hoursWorked: '5',
      hourValue: '24',
      gettingPayed: '240',
    },
  ]);
  const [favArray, setFavArray] = useState([]);
  const [filterList, setFilterList] = useState([...productList]);
  const [rawMaterialList, setRawMaterialList] = useState([
    {
      id: '1',
      name: 'קמח תופח',
      cost: '1.90',
      unit: 'גרם',
      costPerUnit: '0.0019',
      unitAmout: '1000',
      unitId: '1',
      amout: '1',
    },
    {
      id: '2',
      name: 'סוכר לבן',
      cost: '6.90',
      unit: 'קילו',
      costPerUnit: '6.90',
      unitAmout: '1',
      unitId: '1',
      amout: '1',
    },
  ]);
  const [rawMaterialListFiltered, setRawMaterialListFiltered] = useState([
    ...rawMaterialList,
  ]);
  const [packagingList, setPackagingList] = useState([
    {
      id: '3',
      name: 'אריזה ראשונה',
      cost: '1.90',
      costPerUnit: '0.0019',
      unit: `מ''ל`,
      unitAmout: '1000',
      unitId: '1',
      amout: '1',
    },
    {
      id: '4',
      name: 'אריזה שנייה',
      cost: '6.90',
      unit: 'ליטר',
      costPerUnit: '6.90',
      unitAmout: '1',
      unitId: '1',
      amout: '1',
    },
  ]);
  const [packagingListFiltered, setPackagingListFiltered] = useState([
    ...packagingList,
  ]);
  const [decorationsList, setDecorationsList] = useState([
    {
      id: '5',
      name: 'קישוט ראשון',
      cost: '10.90',
      unit: 'גרם',
      costPerUnit: '0.0109',
      unitAmout: '1000',
      unitId: '1',
      amout: '1',
    },
    {
      id: '6',
      name: 'בדיקה',
      cost: '12.90',
      unit: 'קילו',
      costPerUnit: '12.90',
      unitAmout: '1',
      unitId: '1',
      amout: '1',
    },
  ]);
  const [decorationsListFiltered, setDecorationsListFiltered] = useState([
    ...decorationsList,
  ]);

  const addProductList = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setProductList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setFilterList(state => {
      return [{...item, id: idRandom}, ...state];
    });
  };

  const deleteProductList = id => {
    setProductList(state => state.filter(item => item.id !== id));
    setFilterList(state => state.filter(item => item.id !== id));
    setFavArray(state => [...state.filter(item => item !== id)]);
  };

  const copyProductList = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setProductList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setFilterList(state => {
      return [{...item, id: idRandom}, ...state];
    });
  };

  const updateProductList = item => {
    setProductList(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
    setFilterList(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
  };

  const addRawMaterial = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setRawMaterialList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setRawMaterialListFiltered(state => {
      return [{...item, id: idRandom}, ...state];
    });
    mutate();
  };

  const deleteRawMaterial = id => {
    setRawMaterialList(state => {
      return [...state.filter(item => item.id !== id)];
    });
    setRawMaterialListFiltered(state => {
      return [...state.filter(item => item.id !== id)];
    });
  };

  const copyRawMaterial = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setRawMaterialList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setRawMaterialListFiltered(state => {
      return [{...item, id: idRandom}, ...state];
    });
  };

  const updateRawMaterial = item => {
    setRawMaterialList(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
    setRawMaterialListFiltered(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
  };

  const addDecorations = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setDecorationsList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setDecorationsListFiltered(state => {
      return [{...item, id: idRandom}, ...state];
    });
  };

  const deleteDecorations = id => {
    setDecorationsList(state => {
      return [...state.filter(item => item.id !== id)];
    });
    setDecorationsListFiltered(state => {
      return [...state.filter(item => item.id !== id)];
    });
  };

  const copyDecorations = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setDecorationsList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setDecorationsListFiltered(state => {
      return [{...item, id: idRandom}, ...state];
    });
  };

  const updateDecorations = item => {
    setDecorationsList(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
    setDecorationsListFiltered(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
  };

  const addPackaging = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setPackagingList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setPackagingListFiltered(state => {
      return [{...item, id: idRandom}, ...state];
    });
  };

  const deletePackaging = id => {
    setPackagingList(state => {
      return [...state.filter(item => item.id !== id)];
    });
    setPackagingListFiltered(state => {
      return [...state.filter(item => item.id !== id)];
    });
  };

  const copyPackaging = item => {
    const idRandom = Math.random().toString() + Math.random().toString();
    setPackagingList(state => {
      return [{...item, id: idRandom}, ...state];
    });
    setPackagingListFiltered(state => {
      return [{...item, id: idRandom}, ...state];
    });
  };

  const updatePackaging = item => {
    setPackagingList(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
    setPackagingListFiltered(state => {
      const newItemIndex = state.findIndex(
        itemReceived => itemReceived.id === item.id,
      );
      const newArray = [...state];
      newArray[newItemIndex] = item;
      return newArray;
    });
  };

  const filterListHandler = (text, array) => {
    if (array === productList) {
      setFilterList(array.filter(item => item.name.includes(text)));
    }
    if (array === rawMaterialList) {
      setRawMaterialListFiltered(
        array.filter(item => item.name.includes(text)),
      );
    }
    if (array === decorationsList) {
      setDecorationsListFiltered(
        array.filter(item => item.name.includes(text)),
      );
    }
    if (array === packagingList) {
      setPackagingListFiltered(array.filter(item => item.name.includes(text)));
    }
  };

  const addFavArray = id => {
    setFavArray(oldState => [...oldState, id]);
  };

  const removeFavArray = id => {
    setFavArray(oldState => {
      const filteredArray = oldState.filter(item => item !== id);
      return filteredArray;
    });
  };

  return (
    <ProductList.Provider
      value={{
        productList,
        favArray,
        filterList,
        rawMaterialList,
        packagingList,
        decorationsList,
        rawMaterialListFiltered,
        packagingListFiltered,
        decorationsListFiltered,
        id,
        setId,
        addProductList,
        setFilterList,
        deleteProductList,
        copyProductList,
        updateProductList,
        addRawMaterial,
        setRawMaterialListFiltered,
        copyRawMaterial,
        deleteRawMaterial,
        updateRawMaterial,
        addDecorations,
        setDecorationsListFiltered,
        copyDecorations,
        deleteDecorations,
        updateDecorations,
        addPackaging,
        setPackagingListFiltered,
        copyPackaging,
        deletePackaging,
        updatePackaging,
        filterListHandler,
        addFavArray,
        removeFavArray,
      }}>
      {children}
    </ProductList.Provider>
  );
};

export {ProductListProvider};
export default ProductList;
