import React, { forwardRef, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faEyeDropperEmpty, faSpa } from "@fortawesome/free-solid-svg-icons";

const Layout = styled.div`
  /* border: solid 2px blue; */
  .manage-box {
    display: flex;
    /* border: solid 1px red; */
    margin-left: 1rem;
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
    font-size: 1.3rem;
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
`;

const AwesomeIcon = forwardRef(({ className, icon, onClick }, ref) => <FontAwesomeIcon icon={icon} className={className} onClick={onClick} forwardedRef={ref} />);

function PlantManageToggle({ className }) {
  const dropRef = useRef(null);
  const nutritionRef = useRef(null);
  const repottingRef = useRef(null);
  let isDrop = false;
  let isNutirition = false;
  let isRepotting = false;

  function toggle(fnName) {
    const task = {
      water() {
        isDrop = !isDrop;

        if (isDrop) {
          dropRef.current.classList.value = "svg-inline--fa fa-droplet icon drop fill";
        } else {
          dropRef.current.classList.value = "svg-inline--fa fa-droplet icon drop";
        }
      },
      nutrition() {
        isNutirition = !isNutirition;

        if (isNutirition) {
          nutritionRef.current.classList.value = "svg-inline--fa fa-eye-dropper icon nutrition fill";
        } else {
          nutritionRef.current.classList.value = "svg-inline--fa fa-eye-dropper icon nutrition";
        }
      },
      repotting() {
        isRepotting = !isRepotting;
        if (isRepotting) {
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

  return (
    <Layout className={className}>
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
                toggle("water");
              }}
            />
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"nutrition"}
              ref={nutritionRef}
              icon={faEyeDropperEmpty}
              onClick={() => {
                toggle("nutrition");
              }}
            />
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"repotting"}
              ref={repottingRef}
              icon={faSpa}
              onClick={() => {
                toggle("repotting");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PlantManageToggle;
