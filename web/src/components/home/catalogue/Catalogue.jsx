import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./catalogue.scss";

const Catalogue = ({children}) => {
  const isInItems = window.location.href.split('/').includes('items')
  console.log(isInItems);
  const navigate = useNavigate()
  return (
    <div className="app__c">
      <p className="app__c-logo" 
      onClick={() => navigate("/", { replace: false })}
      >OHL-CATALOGUE</p>
      <Button onClick={() => navigate(isInItems? "/catalogue" : "/catalogue/items", {replace: false}) } >
        GO to {isInItems? "Drawings": "Items"}
      </Button>
      <div className="app__c-fields">
        {children}
      </div>
    </div>
  );
};

export default Catalogue;
