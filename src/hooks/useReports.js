import {useEffect,useState} from 'react';
import {useAuth} from './useAuth';
import {ApiClient} from '../infrastructure/api/apiClient';
export function useReports(){const {user,loading:authLoading}=useAuth();const uid=user?.uid;const [state,setState]=useState({reports:[],loading:true,error:null});useEffect(()=>{let active=true;async function load(){if(authLoading)return;if(!uid){if(active)setState({reports:[],loading:false,error:null});return;}try{const reports=await new ApiClient().get('/reports/');if(active)setState({reports,loading:false,error:null});}catch(error){if(active)setState({reports:[],loading:false,error});}}load();return()=>{active=false;};},[uid,authLoading]);return state;}
