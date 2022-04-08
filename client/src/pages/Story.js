import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Logo from "../components/common/Logo";
import SearchBar from "../components/story/SearchBar";
import StoryCard from "../components/story/StoryCard";
import useAjaxStore from "../store/ajaxStore";
import Loading from "../components/common/Loading";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-bottom: 3.5rem;
  position: relative;
  /* border: solid 1px blue; */
  // 젤리팝업 오픈시 부모 freeze 옵션
  ${(props) =>
    props.isFreeze &&
    css`
      height: 100vh;
      overflow-y: hidden;
    `}

  .logo {
    margin-top: 2rem;
  }
  .title {
    margin-top: 1rem;
    margin-left: 2rem;
  }
  .story-card {
    margin-top: 2.4rem;
    /* padding: 0 0.3rem; */
  }

  .desc {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    white-space: pre-wrap;
    text-align: center;
    line-height: 1.8;
    color: dimgray;
  }
`;

const Story = () => {
  let { publicJournal, getAllPublicJournal } = useAjaxStore();
  const [story, setStory] = useState([]);
  const [isFreeze, setFreeze] = useState(false);
  useEffect(() => {
    getStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getStory() {
    const res = await getAllPublicJournal();
    setStory(res);
  }

  function storySearch(word) {
    if (word === "") {
      setStory(publicJournal);
      return;
    }

    word = word.replace(/[\s]/g, "");
    const regExp = new RegExp(word);

    const filteredStory = publicJournal.filter((v, i) => {
      const { plantName, nickname, textContent, title } = v;
      const str = plantName + nickname + textContent + title;
      if (regExp.test(str)) return v;
      else return null;
    });
    setStory(filteredStory);
  }
  //story.length === 0
  return (
    <Layout isFreeze={isFreeze}>
      <Logo className="logo" />
      <div className="title">
        <p>Friend's Daily Log</p>
      </div>
      <SearchBar top={62} left={98} width={40} fn={storySearch} />
      {publicJournal[0] === "none" ? (
        <div className="desc">
          <div>{`본인과 다른 사람들이 작성한 일지 중\n 공개된 일지가 없습니다.`}</div>
        </div>
      ) : story.length === 0 ? (
        <Loading isAb={true} top={250} left={0} />
      ) : (
        <StoryCard className="story-card" storyList={story} hoverTransitonSec={0.25} setFreeze={setFreeze} getStory={getStory} />
      )}
    </Layout>
  );
};

export default Story;
