import React, { forwardRef, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faEyeDropperEmpty, faSpa } from "@fortawesome/free-solid-svg-icons";

const Layout = styled.div`
  /* border: solid 2px blue; */
  .manage-box {
    display: flex;
    /* border: solid 1px red; */
  }

  .manage-box > .icon {
    display: flex;
    justify-content: center;
    width: 11.5%;
    /* border: solid 1px green; */
    padding: 3px 0;
    align-items: center;
  }

  .text {
    /* width: 12%; */
    text-align: center;
    font-size: ${(props) => props.theme.fontWritePageMid};
    padding: 6px 0 0 0;
  }
  .icon {
    align-self: center;
    font-size: 1.4rem;
    color: Gainsboro;
    transition: color 0.2s ease;
    padding: 3px;
  }
  .drop {
  }
  .drop.fill {
    color: DodgerBlue;
  }

  .nutrition.fill {
    color: MediumSeaGreen;
  }

  .repotting.fill {
    color: Sienna;
  }

  .semantic {
    display: none;
  }
`;

const AwesomeIcon = forwardRef(({ className, icon, onClick }, ref) => <FontAwesomeIcon icon={icon} className={className} onClick={onClick} forwardedRef={ref} />);

function PlantManageToggle({ className }) {
  const dropRef = useRef(null);
  const nutritionRef = useRef(null);
  const repottingRef = useRef(null);
  const [toggle, setToggle] = useState({
    isDrop: true,
    isNutirition: true,
    isRepotting: true,
  });

  function toggleHandler(fnName) {
    const task = {
      water() {
        setToggle({ ...toggle, isDrop: !toggle.isDrop });
        if (toggle.isDrop) {
          dropRef.current.classList.value = "svg-inline--fa fa-droplet icon drop fill";
        } else {
          dropRef.current.classList.value = "svg-inline--fa fa-droplet icon drop";
        }
      },
      nutrition() {
        setToggle({ ...toggle, isNutirition: !toggle.isNutirition });

        if (toggle.isNutirition) {
          nutritionRef.current.classList.value = "svg-inline--fa fa-eye-dropper icon nutrition fill";
        } else {
          nutritionRef.current.classList.value = "svg-inline--fa fa-eye-dropper icon nutrition";
        }
      },
      repotting() {
        setToggle({ ...toggle, isRepotting: !toggle.isRepotting });
        if (toggle.isRepotting) {
          repottingRef.current.classList.value = "svg-inline--fa fa-spa icon repotting fill";
        } else {
          repottingRef.current.classList.value = "svg-inline--fa fa-spa icon repotting";
        }
      },
    };

    if (!task[fnName]) {
      console.log("정의되지 않은 토글 함수");
      return null;
    }

    return task[fnName]();
  }

  function convertToggle() {
    let submitToggle = { ...toggle };
    submitToggle.isDrop = !submitToggle.isDrop;
    submitToggle.isNutirition = !submitToggle.isNutirition;
    submitToggle.isRepotting = !submitToggle.isRepotting;
    return submitToggle;
  }

  return (
    <Layout className={className}>
      <button className="semantic" name="toggle" value={JSON.stringify(convertToggle())} />
      <div className="shell">
        <div className="manage-box">
          <div className="text">
            <div>관리:</div>
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"drop"}
              ref={dropRef}
              icon={faDroplet}
              onClick={() => {
                toggleHandler("water");
              }}
            />
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"nutrition"}
              ref={nutritionRef}
              icon={faEyeDropperEmpty}
              onClick={() => {
                toggleHandler("nutrition");
              }}
            />
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"repotting"}
              ref={repottingRef}
              icon={faSpa}
              onClick={() => {
                toggleHandler("repotting");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PlantManageToggle;
