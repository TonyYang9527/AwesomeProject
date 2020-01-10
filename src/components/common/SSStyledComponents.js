import styled from 'styled-components'
import Colors from '@constants/Colors';
import Dimension from '@constants/Dimension';

export const ScrollViewContainer = styled.ScrollView`
    paddingLeft: 0;
    paddingRight: 0;
    paddingTop: 10;
    paddingBottom: 10;
    backgroundColor: ${Colors.white}
`;

export const PaddingView = styled.ScrollView`
    paddingLeft: 15;
    paddingRight: 15;
    marginBottom: 15;
`;

export const PaddingTopView = styled.ScrollView`
    paddingLeft: 15;
    paddingRight: 15;
    paddingTop: 15;
    paddingBottom: 15;
`;

export const CenterView = styled.View`
    justifyContent: center;
    alignItems: center;
    paddingBottom: 10;
`;

export const CompanyLogoImage = styled.Image`
    width: 120;
    height: 120;
    paddingBottom: 10;
`;

export const SmallImage = styled.Image`
   width:60;
   height:60
`;

export const TitleText = styled.Text`
  color: ${Colors.textColor};
  fontSize: 14;
  fontWeight: bold;
  marginTop: 10;
`;

export const SubText = styled.Text`
  flex: 1;
  color: ${Colors.labelColor};
  fontSize: 12;
  paddingBottom: 5
`;

export const LightText = styled.Text`
  color: ${Colors.extraColor};
  fontSize: 12;
  paddingBottom: 5
`;

export const PriceText = styled.Text`
  color: ${Colors.red};
  fontWeight: bold;
  fontSize: 12;
  paddingBottom: 5
`;

export const RowView = styled.View`
  flexDirection: row;
  alignItems: center;
`;

export const SectionHeaderView = styled.View`
    paddingLeft: 0;
    paddingRight: 0;
    paddingTop: 10;
    paddingBottom: 10;
    minHeight: ${Dimension.section_height};
    backgroundColor: ${Colors.background};
    borderTopWidth: ${props => { return props.borderTopWidth ? Number(props.borderTopWidth) : 0 }};
    borderTopColor: ${Colors.borderColor};
    borderBottomWidth: ${Dimension.line};
    borderBottomColor: ${Colors.line};
    borderRadius: ${props => { return props.borderRadius ? Number(props.borderRadius) : 0 }};
`;

export const ExpandableSectionHeaderView = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    paddingLeft: 0;
    paddingRight: 0;
    paddingTop: 10;
    paddingBottom: 10;
    minHeight: ${Dimension.section_height};
    backgroundColor: ${Colors.white};
    borderTopWidth: 0;
    borderTopColor: ${Colors.borderColor};
    borderBottomWidth: ${Dimension.line};
    borderBottomColor: ${Colors.line};
    borderRadius: ${props => { return props.borderRadius ? Number(props.borderRadius) : 0 }};
`;

export const SectionHeaderTitleText = styled.Text`
    paddingLeft: 15;
    paddingRight: 15;
    color: ${Colors.labelColor};
    fontSize: 14;
`;


export const ExpandableSectionHeaderTitleText = styled.Text`
    paddingLeft: 10;
    paddingRight: 10;
    color: ${Colors.baseColor};
    fontSize: 14;
`;
