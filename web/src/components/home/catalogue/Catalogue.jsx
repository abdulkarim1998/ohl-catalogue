import "./catalogue.scss";
import Fields from "./fields/Fields";

const Catalogue = () => {
  return (
    <div className="app__c">
      <p className="app__c-logo">OHL-CATALOGUE</p>

      <div className="app__c-fields">
        <Fields />
        <img
          src="https://www.clipartmax.com/png/middle/156-1567109_hollow-knight-by-team-cherry-kickstarter-blacksmith-hollow-knight.png"
          alt="ranjo stenja"
        />
      </div>
    </div>
  );
};

export default Catalogue;
