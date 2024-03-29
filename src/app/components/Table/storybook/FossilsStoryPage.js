import React, { Component } from "react";
import styled from "styled-components";
import { Table } from "../Table";
import { ColumnConfiguration } from "../../../utils/column-configuration";
import { TableHeaderConstants } from "../../../utils/table-header-constants";

let Container = styled.div`
  padding: 0 50px 50px 50px;
`;

let fossilsMainDirectory = [
  {
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Chondrichthyes",
    link: "/collections/chondrichthyes"
  },
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Malacostraca",
    link: "/collections/malacostraca"
  },
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Trilobita",
    link: "/collections/trilobita"
  }
];

// Add an index to each element (for ordering):
fossilsMainDirectory = fossilsMainDirectory.map((fossilRecord, index) => {
  return {
    ...fossilRecord,
    index
  };
});

/***
 * Only used in the storybook
 */
class FossilsStoryPage extends Component {
  state = {
    data: fossilsMainDirectory,
    filterText: "",
    filterKey: ""
  };

  render() {
    let { data } = this.state;

    // Table Configuration
    let columns = new ColumnConfiguration({
      desktop: [...TableHeaderConstants.desktop],
      tablet: [...TableHeaderConstants.tablet],
      mobile: [...TableHeaderConstants.mobile]
    });

    return (
      <Container>
        <div>
          <h4>Fossil Dictionary</h4>
        </div>
        <div>
          <p>Storybook that will act as a prototype for showcasing fossils in the collections directory.</p>
        </div>
        <Table
          data={data}
          defaultSortType="string"
          defaultSortKey="class"
          defaultSortAsc={true}
          columnConfiguration={columns.desktop}
          tabletOverrideColumnConfiguration={columns.tablet}
          mobileOverrideColumnConfiguration={columns.mobile}
        >
          {({ filter }) => {
            return (
              <>
                {/*TODO: MONDAY add some filters*/}
              </>
            );
          }}
        </Table>
      </Container>
    );
  }
}

export default FossilsStoryPage;
