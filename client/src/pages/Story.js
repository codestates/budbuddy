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
  position: relative;
  padding-bottom: 3.5rem;
  /* border: solid 1px blue; */
  // 젤리팝업 오픈시 부모 freeze 옵션
  ${(props) =>
    props.isFreeze &&
    css`
      height: 100vh;
      overflow-y: hidden;
    `}

  .logo {
    margin-top: 1.3rem;
  }
  .title {
    margin-top: 1rem;
    margin-left: 2rem;
  }
  .story-card {
    margin-top: 2.4rem;
    /* padding: 0 0.3rem; */
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
      {story.length === 0 ? <Loading isAb={true} top={250} left={0} bgColor={"none"} /> : <StoryCard className="story-card" storyList={story} hoverTransitonSec={0.25} setFreeze={setFreeze} />}
    </Layout>
  );
};

export default Story;
