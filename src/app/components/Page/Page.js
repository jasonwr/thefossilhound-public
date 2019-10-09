import React, { Component } from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import BreadcrumbService from "../../services/breadcrumb-service";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import ConnectedMenu from "../Menu/ConnectedMenu";
import ConnectedUnitSelector from "../UnitSelector/ConnectedUnitSelector";

const PrintButtonWrapper = styled.div`
  padding-bottom: 5px;
`;

// All the content is bound to the center of the 3x3 grid. This works well as content is stacked vertically then
// scales as a grid matrix (responds automatically to screen size changes).
const Content = styled.div`
  display: grid;
  font-family: ${({ theme }) => theme.font.fontFamilySans};
  ${({ theme }) => theme.fontSize(12)};
  color: ${({ theme }) => theme.color.gray800};
  line-height: 20px;
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: white;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-template-columns: 100%;
    align-items: center;
    margin-top: 0;
  }
`;

const Header = styled(Content)`
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Overall grid with a 3x3 matrix. The left and right columns are simply gutters.
const PageContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 0.475fr 2fr 0.475fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid black;
  color: black;
  // Consider putting all this into styled-components@beta createGlobalStyle and apply to h1,h2,h3,h4,h5,h6
  font-family: ${({ theme }) => theme.font.fontFamilyHelamSlab};
  font-style: normal;
  font-weight: 200;
  ${({ theme }) => theme.fontSize(32)};
  line-height: 35px;
  margin: 5px 0;
`;

class Page extends Component {
  state = {
    isMobile: false
  };

  handleResize = () => {
    let isMobile = false;
    if (window.outerWidth < 768) {
      isMobile = true;
    }

    if (isMobile !== this.state.isMobile) {
      this.setState({ isMobile });
    }
  };

  componentWillMount() {
    const { title, router } = this.props;
    if (router) {
      let breadCrumbService = new BreadcrumbService();
      breadCrumbService.push(title, router.asPath);
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    let {
      children,
      title,
      includeMenu = true,
      includeHeader = true,
      breadcrumbItems,
      renderPrintOptionsTooltip
    } = this.props;

    if (!breadcrumbItems) {
      let breadCrumbService = new BreadcrumbService();
      breadcrumbItems = breadCrumbService.getItems();
    }

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        {includeMenu && <ConnectedMenu/>}
        <PageContainerGrid>
          <Header>
            {includeHeader && <Breadcrumb items={breadcrumbItems}/>}
            {includeHeader && <ConnectedUnitSelector/>}
            {includeHeader && (
              <StyledHeader>
                <div>{title}</div>
                {renderPrintOptionsTooltip && typeof renderPrintOptionsTooltip === "function" && (
                  <PrintButtonWrapper>{renderPrintOptionsTooltip()}</PrintButtonWrapper>
                )}
              </StyledHeader>
            )}
          </Header>
          <Content>{children}</Content>
        </PageContainerGrid>
      </>
    );
  }
}

export default withRouter(Page);
