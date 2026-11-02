import {useEffect,useState} from 'react';
import {useAuth} from './useAuth';
import {RankingApi} from '../infrastructure/api/rankingApi';
export function useRanking(period='all'){
 const {user,loading:authLoading}=useAuth();const uid=user?.uid;
 const [state,setState]=useState({ranking:[],loading:true,error:null});
 useEffect(()=>{let active=true;async function load(){if(authLoading)return;if(!uid){if(active)setState({ranking:[],loading:false,error:null});return;}setState(p=>({...p,loading:true,error:null}));try{const ranking=await new RankingApi().getRanking(period);if(active)setState({ranking,loading:false,error:null});}catch(error){if(active)setState({ranking:[],loading:false,error});}}load();return()=>{active=false;};},[uid,authLoading,period]);return state;
}
