import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  /* border: solid 1px black; */
  width: 100%;
  margin: 0 auto;

  .shell {
    /* border: solid 1px red; */
    width: 100%;
  }

  .wrap {
    /* border: solid 1px yellow; */
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-evenly;
    width: 100%;
    gap: 0.3rem 0.3rem;
    padding: 0.1rem 0.1rem;
  }
`;

const Card = styled.div`
  .borderlt {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: ${(props) => props.theme.borderRadius};
  }

  .borderlt::before {
    width: 0%;
    left: 50%;
    transform: translateX(-50%);
  }

  .borderlt::after {
    height: 0%;
    top: 50%;
    transform: translateY(-50%);
  }

  .borderlt::before,
  .borderlt::after {
    content: "";
    position: absolute;
    border: solid 2px ${(props) => props.theme.cardSelectColor};
    transition: width ${(props) => `${props.hoverTransitonSec}s`} ease-out, height ${(props) => `${props.hoverTransitonSec}s`} ease-out;
    visibility: hidden;
    border-bottom: none;
    border-right: none;
  }

  .borderlt:hover {
    &.borderlt::before {
      visibility: visible;
      width: 100%;
    }
    &.borderlt::after {
      visibility: visible;
      height: 99.9%;
    }
  }
  .borderrb {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: ${(props) => props.theme.borderRadius};
  }

  .borderrb::before {
    width: 0%;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }

  .borderrb::after {
    height: 0%;
    top: 50%;
    right: 0%;
    transform: translateY(-50%);
  }

  .borderrb::before,
  .borderrb::after {
    content: "";
    position: absolute;
    border: solid 2px ${(props) => props.theme.cardSelectColor};
    transition: width ${(props) => `${props.hoverTransitonSec}s`} ease-out, height ${(props) => `${props.hoverTransitonSec}s`} ease-out;
    visibility: hidden;
    border-left: none;
    border-top: none;
  }

  .borderrb:hover {
    &.borderrb::before {
      visibility: visible;
      width: 100%;
    }
    &.borderrb::after {
      visibility: visible;
      height: 99.9%;
    }
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.storyCardBgColor};

  .top-cap {
    display: grid;
    grid-template-columns: 20% 63% 10%;
    grid-template-rows: repeat(1, minmax(1fr, auto));
    grid-template-areas: " profile-img name-wrap date";

    .profile-img > img {
      object-fit: cover;
      width: 35px;
      height: 35px;
      margin: 0.3rem;
      border-radius: 50%;
      border: 2px solid ForestGreen;
      box-shadow: inset 0px 0px 2px 3px ForestGreen;
      transition: border 0.15s ease, box-shadow 0.15s ease;
    }

    .profile-img > img:hover {
      border: 2px solid DodgerBlue;
      box-shadow: inset 0px 0px 2px 3px DodgerBlue;
    }

    .profile-img {
      grid-area: profile-img;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name-wrap {
      grid-area: name-wrap;
      display: flex;
      flex-direction: column;
      justify-content: center;

      font-size: ${(props) => props.theme.fontWritePageXSmall};
      margin-left: 0.5rem;

      .user-name {
        margin-top: 0.3rem;
      }
      .plant-name {
        margin-top: 0.1rem;
      }
    }
    .date {
      grid-area: date;
      display: flex;
      flex-direction: column;
      justify-content: end;

      font-size: ${(props) => props.theme.fontWritePageXSmall};
      margin-bottom: 0.3rem;
    }
  }

  .middle-cap {
    .journal-img {
      overflow: hidden;
    }
    .journal-img > img {
      object-fit: cover;
      width: 100%;
      height: 15vh;
      transition: transform ${(props) => `${props.hoverTransitonSec}s`} ease;
    }

    .summary {
      font-size: ${(props) => props.theme.fontWritePageXSmall};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 0.2rem 0 0.2rem;
    }
  }
  .bottom-cap {
    display: flex;
    margin: 0.25rem;
    .read-wrap {
      margin-left: 0.1rem;
    }

    .share-wrap {
      margin-left: 0.6rem;
    }

    > div > button {
      border: none;
      border-radius: ${(props) => props.theme.borderRadius};
      padding: 0.08rem 0.2rem;
      font-size: ${(props) => props.theme.fontWritePageXSmall};
    }

    .btn {
      color: black;
      background-color: ${(props) => props.theme.btnBgColor};
      transition: background-color ${(props) => `${props.hoverTransitonSec}s`} ease, color ${(props) => `${props.hoverTransitonSec}s`} ease;
    }

    .btn:hover {
      background-color: ${(props) => props.theme.hoverColor};
      color: white;
    }
  }

  :hover {
    .journal-img > img {
      transform: scale(1.05);
    }
  }
`;

const StoryCard = ({ className = "", storyList, hoverTransitonSec = 0.25 }) => {
  function read(e) {
    e.preventDefault();
    console.log("스토리 읽기");
  }

  function share(e) {
    e.preventDefault();
    console.log("스토리 공유");
  }

  return (
    <Layout className={className}>
      <div className="shell">
        <div className="wrap">
          {storyList.map((v, i) => {
            return (
              <Card key={v.journalsId} hoverTransitonSec={hoverTransitonSec}>
                <div className="borderlt">
                  <div className="borderrb">
                    <div className="top-cap">
                      <div className="profile-img">
                        <img src={v.profileImg} alt="" />
                      </div>
                      <div className="name-wrap">
                        <div className="user-name">{v.username}</div>
                        <div className="plant-name">{v.plantName}</div>
                      </div>
                      <div className="date">
                        <div>{v.createdAt}</div>
                      </div>
                    </div>
                    <div className="middle-cap">
                      <div className="journal-img">
                        <img className="plant-img" src={v.journalImg} alt="" />
                      </div>
                      <div className="summary">{v.summary}</div>
                    </div>
                    <div className="bottom-cap">
                      <div className="read-wrap">
                        <button className="read btn" onClick={read}>
                          보기
                        </button>
                      </div>
                      <div className="share-wrap">
                        <button className="share btn" onClick={share}>
                          공유
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default StoryCard;
