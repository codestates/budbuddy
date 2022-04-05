import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useNavigateSearch } from "../../modules/hooks";
import useAjaxStore from "../../store/ajaxStore";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${(props) => props.theme.fontWritePageMid};
    margin-top: 1.2rem;
  }
  .date-wrap {
    margin-left: 0.5rem;
    font-size: ${(props) => props.theme.fontWritePageSmall};
  }
  .btn-wrap {
    margin-right: 0.5rem;

    > button {
      font-size: ${(props) => props.theme.fontWritePageSmall};
      border: none;
      border-radius: ${(props) => props.theme.borderRadius};
      padding: 0.1rem 0.2rem;
      background-color: rgba(1, 1, 1, 0);
      transition: all 0.2s ease;
    }
  }

  .modify:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;
  }
  .delete {
    margin-left: 0.5rem;
  }
  .delete:hover {
    color: #fff;
    background-color: ${(props) => props.theme.hoverCancleColor};
  }

  .title {
    transition: color 0.2s ease;
    padding: 0.1rem 0.6rem;
    border-radius: ${(props) => props.theme.borderRadius};
  }
  .title:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: #fff;
  }
  .budname {
    font-size: ${(props) => props.theme.fontWritePageXSmall};
    color: SlateGray;
  }
`;

const DiaryList = ({ diaryList = [], isBudName = false, type = "" }) => {
  const navigateSearch = useNavigateSearch();
  const goToListByMode = (mode, info) => navigateSearch(`/daily/${mode}`, { info });
  const { setListByUserId, setListByPlantId, deleteListByJournalId } = useAjaxStore();

  const callRead = (journal) => {
    goToListByMode("read", encodeURI(JSON.stringify(journal)));
  };

  const callModify = (journal) => {
    goToListByMode("modify", encodeURI(JSON.stringify(journal)));
  };

  const callDelete = async (journal_id, plant_id) => {
    await deleteListByJournalId(journal_id);
    if (type === "user") {
      setListByUserId();
    } else if (type === "plant") {
      setListByPlantId(plant_id);
    }
  };

  function convertDate(date) {
    return moment(date).format("YY-MM-DD");
  }

  // console.log("뭐이", diaryList);

  return (
    <Layout>
      {diaryList.map((journal, i) => {
        // console.log("DiaryList:::", journal);
        let plantName = "";
        if (!journal.Plant) {
          plantName = "삭제된 식물";
        } else {
          plantName = journal.Plant.name;
        }
        return (
          <div key={journal.id} className="wrap">
            <div className="date-wrap">
              <div>{convertDate(journal.date)}</div>
            </div>
            <div
              className="title"
              onClick={() => {
                callRead(journal);
              }}>
              <div>
                {`${journal.title}`}
                <span className="budname">{isBudName ? ` (${plantName})` : ""}</span>
              </div>
            </div>
            <div className="btn-wrap">
              <button
                className="modify"
                onClick={() => {
                  callModify(journal);
                }}>
                수정
              </button>
              <button
                className="delete"
                onClick={() => {
                  callDelete(journal.id, journal.PlantId);
                }}>
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </Layout>
  );
};
export default DiaryList;
