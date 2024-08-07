import BASE_URL from "../config/config";
import { mapJewelry } from "../mappings/mapJewelry";
import { Jewelry } from "../models/Jewelry";
import { fetchWithToken } from "./AuthenticationAPI";
import { MyRequest } from "./MyRequest";

interface JewelryRequest {
  id: number;
  name: string;
  buyNowPrice: number;
  category: string | undefined;
  description: string;
  material: string;
  brand: string;
  weight: number;
  userId: number | undefined;
}

interface ResultPageableInteface {
  jeweriesData: Jewelry[];
  totalElements: number
}

export async function getJewelriesPagination(username: string, page: number): Promise<ResultPageableInteface> {
  const jeweriesData: Jewelry[] = [];

  const URL = `${BASE_URL}/jewelry/sorted-and-paged?username=${username}&page=${page - 1}`;
  // request
  try {
    const response = await MyRequest(URL);
    const responseData = response.content;

    if (responseData) {
      responseData.forEach((jewelryData: any) => {
        jeweriesData.push(mapJewelry(jewelryData));
      });
    }
    return {
      jeweriesData: jeweriesData,
      totalElements: response.totalElements,
    };
  } catch (error) {
    console.error("Error fetching jewelries:", error);
    throw new Error("Failed to fetch jewelries");
  }
}

export const sendJewelryFromUser = async (jewelryRequest: JewelryRequest): Promise<boolean> => {
  const accessToken = localStorage.getItem('access_token');
  // end-point
  const URL = `${BASE_URL}/jewelry/jewelry-request`;
  // call api
  try {
    const response = await fetchWithToken(URL, 'POST', accessToken, jewelryRequest);
    if (!response.ok) {
      throw new Error(`Không thể truy cập ${URL}`);
    }
    return true;
  } catch (error) {
    console.error("Error: " + error);
    return false;
  }
};

export async function getJewelriesWaitList(page: number): Promise<ResultPageableInteface> {
  // endpoint
  const URL: string = `${BASE_URL}/jewelry/in-wait-list?page=${page - 1}`;
  // request   
  try {
    const response = await MyRequest(URL);
    const jeweriesData: Jewelry[] = response.content.map((jewelry: any) => mapJewelry(jewelry));
    const totalElements = response.totalElements;
    return {
      jeweriesData: jeweriesData,
      totalElements: totalElements
    }
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Trang sức không tồn tại");
  }
}

export async function getJewelriesByStateAndHolding(state: string, jewelryName: string, holding: boolean, category: string, page: number): Promise<ResultPageableInteface> {
  // endpoint

  const URL: string = `${BASE_URL}/jewelry/is-holding?state=${state}&jewelryName=${jewelryName}&category=${category}&isHolding=${holding}&page=${page - 1}`;

  // request
  try {
    const response = await MyRequest(URL);
    const jeweriesData: Jewelry[] = response.content.map((jewelry: any) => mapJewelry(jewelry));
    const totalElements = response.totalElements;
    return {
      jeweriesData: jeweriesData,
      totalElements: totalElements
    }
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Trang sức không tồn tại");
  }
}

export async function setJewelryStateWithHolding(id: number, isHolding: boolean, state: string): Promise<boolean> {
  // endpoint
  const URL: string = `${BASE_URL}/jewelry/set-state-holding/${id}?state=${state}&isHolding=${isHolding}`;
  const response = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('Failed to set holding the jewelry:', errorDetails);
    return false
  }

  return true;
}


export async function getJewelriesActiveByUserId(userId: number, jewelryName: string, page: number): Promise<ResultPageableInteface> {
  // endpoint
  const URL: string = `${BASE_URL}/jewelry/user-jewelry/${userId}?jewelryName=${jewelryName}&page=${page - 1}`;
  // request

  try {
    const response = await MyRequest(URL);
    const jeweriesData: Jewelry[] = response.content.map((jewelry: any) => mapJewelry(jewelry));
    const totalElements = response.totalElements;

    return {
      jeweriesData: jeweriesData,
      totalElements: totalElements
    }
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Trang sức không tồn tại");
  }
}

export async function getJewelriesReturned(jewelryName: string, category: string, page: number): Promise<ResultPageableInteface> {
  // endpoint
  const URL: string = `${BASE_URL}/jewelry/return-violator?jewelryName=${jewelryName}&category=${category}&page=${page - 1}`;
  // request

  try {
    const response = await MyRequest(URL);
    const jeweriesData: Jewelry[] = response.content.map((jewelry: any) => mapJewelry(jewelry));
    const totalElements = response.totalElements;

    return {
      jeweriesData: jeweriesData,
      totalElements: totalElements
    }
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Trang sức không tồn tại");
  }
}


export async function setJewelryHidden(id: number): Promise<boolean> {
  // endpoint
  const URL: string = `${BASE_URL}/jewelry/${id}`;
  const response = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('Failed to delete the jewelry:', errorDetails);
    return false
  }

  return true;
}

export async function getJewelriesHandOverList(page: number): Promise<ResultPageableInteface> {
  // endpoint
  const URL: string = `${BASE_URL}/jewelry/in-handover-list?page=${page - 1}`;
  // request
  try {
    const response = await MyRequest(URL);
    const jeweriesData: Jewelry[] = response.content.map((jewelry: any) => mapJewelry(jewelry));
    const totalElements = response.totalElements;
    return {
      jeweriesData: jeweriesData,
      totalElements: totalElements
    }
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Trang sức không tồn tại");
  }
}

export async function getLatestJewelry(): Promise<Jewelry> {
  const URL = `${BASE_URL}/jewelry/latest`
  const response = await MyRequest(URL);
  return response;
}