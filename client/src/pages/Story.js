import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import SearchBar from "../components/story/SearchBar";
import StoryCard from "../components/story/StoryCard";
import useAjaxStore from "../store/AjaxStore";
// import { storyDummyList } from "../utils/dummy";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  position: relative;
  padding-bottom: 3.5rem;
  /* border: solid 1px blue; */

  .logo {
    margin-top: 1.3rem;
  }
  .title {
    margin-top: 1rem;
    margin-left: 2rem;
  }
  .story-card {
    /* margin-top: 2.4rem; */
    /* padding: 0 0.3rem; */
  }
`;

const Story = () => {
  const { publicJournal, getAllPublicJournal } = useAjaxStore();

  useEffect(() => {
    getAllPublicJournal();
  }, []);

  function storySearch() {
    console.log("스토리 검색 함수");
  }

  return (
    <Layout>
      <Logo className="logo" />
      <div className="title">
        <p>Friend's Daily Log</p>
      </div>
      <SearchBar top={62} left={98} width={40} fn={storySearch} />
      <StoryCard className="story-card" storyList={publicJournal} hoverTransitonSec={0.25} />
    </Layout>
  );
};

export default Story;
