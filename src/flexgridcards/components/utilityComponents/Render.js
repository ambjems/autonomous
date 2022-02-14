import React, { Component } from "react";
import withWidth from "@material-ui/core/withWidth";
import layoutConfig from "../../layout-config/layoutConfig.json";
import ComponentGetter from "../../utils/component-getters/ComponentGetter";
import FlexGrid from "./FlexGrid";

class Render extends Component {

  getComponent = componentID => {
    return <ComponentGetter componentId={componentID} />;
  };

  render() {
    const { width } = this.props;
    const layoutConfigView = layoutConfig["0"][width];

      return (

        <FlexGrid
          layoutConfiguration={layoutConfigView}
          getComponent={this.getComponent}
        />
      );
    }

}

export default withWidth()(Render);