import styled from "styled-components"

export const Container = styled.div`
  padding: 40px 70px;
  border-radius: 28px;
  background: #EDEDED;

  h3{
    color: #686770;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
    margin-bottom: 28px;
  }
`

export const OptionsList = styled.ul`
  list-style: none;
`

export const Option = styled.li`
  margin-bottom: 18px;
  display: flex;
  align-items: start;

  &:last-child {
    margin-bottom: 46px;
  }

  label {
  color: #686770;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin-left: 10px;
  width: fit-content;
  cursor: pointer;
  }

  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    position: relative;
    width: 14.375px;
    height: 14.375px;
    border: 1px solid ${({ theme }) => theme.colors.neutral50};
    background-color: transparent;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1px;
  }

  input[type="radio"]::after {
  content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.neutral70};
    border-radius: 2px;
    visibility: hidden;
  }

  input[type="radio"]:checked::after {
    visibility: visible;
  }
`