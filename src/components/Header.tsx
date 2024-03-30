import React, {useRef, useState} from 'react';
import styled from "@emotion/styled";
import { AiOutlineSearch } from "react-icons/ai";
import useClickOutside from "../hooks/useClickOutside";
import useMovieSearch from "../features/movie/useMovieSearch";
import {useRecoilState} from "recoil";
import {loginModalOpenState, signupModalOpenState} from "../features/app/atom";

const Base = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(255,255,255);
  text-align: center;
  box-shadow: rgb(0 0 0 / 0%) 0 1px 0 0;
  width: 100%;
  height: 62px;
  z-index: 10;
`;
const Navigation = styled.nav`
  margin: 0 auto;
  max-width: 1200px;
`;
const MenuListWrapper = styled.div``;
const MenuList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Menu = styled.li`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 62px;
  &:not(:first-of-type) {
    margin-left: 24px;
  };
`;
const MenuButton = styled.button<{active?: Boolean}>`
  font-size: 15px;
  color: ${ ({ active }) => active ? 'rgb(53,53,53)': 'rgb(126,126,126)' };
  border: none;
  background: transparent;
  cursor: pointer;
`;
const Link = styled.a`
  text-decoration: none;
`;
const TextLogo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  > span[class="primary"] {
      color: rgb(255, 47, 110);
  }
  > span:not(.primary) {
    color: #222;
  }
`;

const SearchMenu = styled.li`
  display: flex;
  width: 300px;
  height: 62px;
  align-items: center;
  flex-shrink: 1;
  margin: 0 0 0 auto;
  position: relative;
`;
const SearchContainer = styled.div`
    position: relative;
    width: 100%;
`;
const SearchResultWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 9999999;
  background-color: #fff;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  max-height: 480px;
  overflow-y: scroll;
`;
const SearchResultListItem = styled.li`
  padding: 4px 6px;
  box-sizing: border-box;
  color: #222;
  font-size: 16px;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: #eee;
  }
`;
const SearchResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const SearchFormWrapper = styled.div``;
const SearchForm = styled.form``;
const SearchLabel = styled.label`
  display: flex;
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  padding: 7px 8px;
  align-items: center;
  background: rgb(245,245,247);
  border-radius: 2px;
`;
const SearchInput = styled.input`
  font-size: 14px;
  font-weight: 600;
  background: transparent;
  width: 100%;
  padding: 0 0 0 8px;
  border: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  caret-color: rgb(53,53,53);
  line-height: 24px;
`;
const SignIn = styled.button`
  background: transparent;
  color: rgba(116,116,123);
  font-size: 14px;
  padding: 0;
  border: 0;
  cursor: pointer;
  margin: 0 15px;
`;
const SignUp = styled.button`
  border-radius: 6px;
  font-weight: 500;
  box-sizing: border-box;
  min-width: 72px;
  height: 32px;
  background: transparent;
  color: rgb(53,53,53);
  font-size: 14px;
  border: 1px solid rgba(116,116,123,0.5);
  cursor: pointer;
  margin: 0 15px;
`;


const Header: React.FC = () => {
    const searchRef = useRef<HTMLDivElement>(null);
    const pathname = window.location.pathname;

    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(loginModalOpenState);
    const [isSignupModalOpen, setIsSignupModalOpen] = useRecoilState(signupModalOpenState);

    const handleLoginModal = (): void => {
        !isLoginModalOpen && setIsLoginModalOpen(true);
    }

    const handleSignup = (): void => {
        !isSignupModalOpen && setIsSignupModalOpen(true);
    }

    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchKeyword(e.target.value);
    }

    useClickOutside(searchRef, () => setSearchKeyword(''));

    const { data: searchResult } = useMovieSearch(searchKeyword);
    return(
        <Base>
            <Navigation>
                <MenuListWrapper>
                    <MenuList>
                        <Menu>
                            <Link href="/">
                                <TextLogo>
                                    <span className="primary">WATCHOUT</span>
                                    <span>PEDIA</span>
                                </TextLogo>
                            </Link>
                        </Menu>
                        <Menu>
                            <Link href="/">
                                <MenuButton active={pathname === '/'}>영화</MenuButton>
                            </Link>
                        </Menu>
                        <Menu>
                            <Link href="/tv">
                                <MenuButton active={pathname === '/tv'}>TV 프로그램</MenuButton>
                            </Link>
                        </Menu>
                        <SearchMenu>
                            <SearchContainer ref={searchRef}>
                                <SearchFormWrapper>
                                    <SearchForm>
                                        <SearchLabel>
                                            <AiOutlineSearch />
                                            <SearchInput
                                                placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
                                                onChange={handleKeyword}
                                            />
                                        </SearchLabel>
                                    </SearchForm>
                                </SearchFormWrapper>
                                <SearchResultWrapper>
                                    <SearchResultList>
                                        {
                                            searchResult?.results.map((searchResultItem) => (
                                                <Link href={`/movie/${searchResultItem.id}`} key={searchResultItem.id}>
                                                    <SearchResultListItem>{searchResultItem.title}</SearchResultListItem>
                                                </Link>
                                            ))
                                        }
                                    </SearchResultList>
                                </SearchResultWrapper>
                            </SearchContainer>
                        </SearchMenu>
                        <Menu>
                            <SignIn onClick={handleLoginModal}>로그인</SignIn>
                        </Menu>
                        <Menu>
                            <SignUp onClick={handleSignup}>회원가입</SignUp>
                        </Menu>
                    </MenuList>
                </MenuListWrapper>
            </Navigation>
        </Base>
    )
}

export default Header;