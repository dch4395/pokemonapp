
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
  } from "reactstrap";

import "../resources/style.css";
import { RemotePagination } from "../views/Components/RemotePagination";

const PokemontList = ({
    state, 
    pokemon,
    dropdownToggle, 
    handleSizePerPageChange,
    columns,
    handleTableChange,
    handleJumpToPageChange,
    handleSubmitJumpToPage
  }) => {

return(
    <div className="justify-content-md-center">
        <Col sm={12} md={12} lg={8} xl={6}>
            <h3 className="pokemonName topMargin">Pokemon List</h3>
            <div className="topMargin">
                <Col md={{ size: 6 }}>
                <ButtonDropdown
                    className="mr-1 sizePerPageEntriesSelect"
                    isOpen={state.isDropdownOpen}
                    toggle={dropdownToggle}
                >
                    <span className="sizePerPageEntriesTitle showTitle">
                    Show
                    </span>
                    <DropdownToggle caret color="default">
                        {state.dropdownSize}
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={handleSizePerPageChange}>
                        10
                    </DropdownItem>
                    <DropdownItem onClick={handleSizePerPageChange}>
                        25
                    </DropdownItem>
                    <DropdownItem onClick={handleSizePerPageChange}>
                        50
                    </DropdownItem>
                    <DropdownItem onClick={handleSizePerPageChange}>
                        100
                    </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                </Col>
            </div>
            <Row>
                <Col sm={12} md={12} lg={12} xl={12} style={{marginTop: "10px"}} key="list">
                    <RemotePagination
                      id="name"
                      indication="No Data"
                      data={pokemon.pokemonList}
                      columns={columns}
                      sizePerPage={pokemon.limit}
                      page={pokemon.offset}
                      totalSize={pokemon.totalSize}
                      onTableChange={handleTableChange}
                      loading={pokemon.isLoading}
                      onJumpToPageChange={handleJumpToPageChange}
                      onJumpToPage={handleSubmitJumpToPage}
                      showJumpToPage={true}
                    />
                </Col>
            </Row> 
        </Col>
    </div>
    );
};

export default PokemontList;