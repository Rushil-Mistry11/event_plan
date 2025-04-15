import {createContext} from 'react';

export const VendorContext = createContext()

const VendorContextProvider = (props) =>{
  
    const value = {

    }

    return(
        <VendorContext.Provider value={value}>
            {props.children}
        </VendorContext.Provider>
    )
}

export default VendorContextProvider