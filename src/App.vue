<template>
	<div class="container">
		<div class="content-container" v-bind="updateVisibleNFTs()">
			<i
				class="fa-solid fa-arrow-left-long"
				@click="updatePage(currentPage - 1)"
				v-if="currentPage > 0"
			></i>
			<div class="image-wrapper">
				<div
					v-for="token in visibleNFTs"
					:key="token.lwin"
					class="token-wrapper"
					@click="
						displayData(
							token.attributes[8],
							token.name,
							token.attributes[16],
							token.description,
							token.attributes[0], //Wiv Vintage 2022
							token.attributes[1], //Brand
							token.attributes[2], //Producer
							token.attributes[3], //Production country
							token.attributes[4], //Region
							token.attributes[5], //Appelation
							token.attributes[6], //Vintage
							token.attributes[7], // Grape
							token.attributes[9], //Maturity(years)
							token.attributes[10], //WIne heritage
							token.attributes[11], //Investment grade
							token.attributes[12], // Case
							token.attributes[13], //Origin
							token.attributes[14], //SOurce
							token.attributes[15] //Type
						)
					"
				>
					<img :src="token.image" class="token-image" />
				</div>
			</div>
			<i
				class="fa-solid fa-arrow-right-long"
				@click="updatePage(currentPage + 1)"
				v-if="currentPage < Math.ceil(allNFTs.length / 10) - 1"
			></i>
		</div>
		<h3 class="title">METADATA</h3>
		<p>(click to show)</p>
		<div class="box-container" v-if="this.lwin">
			<div class="box-wrapper">
				<div class="token-container">
					<div class="brand">BRAND: {{ this.brand }}</div>
					<div>Lwin: {{ this.lwin }}</div>
					<div>Description: {{ this.description }}</div>
					<div>wivVintage: {{ this.wivVintage }}</div>
					<div>brand: {{ this.brand }}</div>
					<div>producer: {{ this.producer }}</div>
					<div>productionCountry: {{ this.productionCountry }}</div>
					<div>region: {{ this.region }}</div>
					<div>appelation: {{ this.appelation }}</div>
					<div>vintage: {{ this.vintage }}</div>
					<div>grape: {{ this.grape }}</div>
					<div>maturity: {{ this.maturity }}</div>
					<div>wineHeritage: {{ this.wineHeritage }}</div>
					<div>investmentGrade: {{ this.investmentGrade }}</div>
					<div>origin: {{ this.origin }}</div>
					<div>source: {{ this.source }}</div>
					<div>type: {{ this.type }}</div>
					<div>price: {{ this.price }}</div>
				</div>
			</div>
		</div>
		<div v-else>No Price Data</div>
		<footer>UROS STESEVIC &copy; 2022</footer>
	</div>
</template>

<script>
import axios from 'axios';
import './css/App.css';
import Web3 from 'web3';
import contract from './smart-contract/contract.json';
// import { config } from 'dotenv';
// config();

// import dotenv from 'dotenv';

// dotenv.config();
export default {
	name: 'App',
	data() {
		return {
			account: String,
			token: String,
			allNFTs: [],
			pageSize: 10,
			currentPage: 0,
			visibleNFTs: [],
			lwin: Number(),
			bottleSize: '',
			case: '',
			price: '',
			name: '',
			description: '',
			wivVintage: '',
			brand: '',
			producer: '',
			productionCountry: '',
			region: '',
			appelation: '',
			vintage: '',
			grape: '',
			maturity: '',
			wineHeritage: '',
			investmentGrade: '',
			origin: '',
			source: '',
			priceType: '',
			num: '',
		};
	},
	methods: {
		async getNFTs() {
			const web3 = new Web3('https://polygon-rpc.com');
			const newContract = new web3.eth.Contract(
				contract,
				'0x57a8D59eFF06381a9B0D709271871187Ee1b418C'
			);
			await newContract.methods
				.totalSupply()
				.call()
				.then((res) => (this.num = res));

			for (let i = 1; i < this.num; i++) {
				newContract.methods
					.tokenURI(i)
					.call()
					.then((res) =>
						axios
							.get(res)
							.then((res1) => this.allNFTs.push(res1.data))
					);
			}
		},
		updatePage(pageNumber) {
			this.currentPage = pageNumber;
			this.updateVisibleNFTs();
		},
		updateVisibleNFTs() {
			this.visibleNFTs = this.allNFTs.slice(
				this.currentPage * this.pageSize,
				this.currentPage * this.pageSize + this.pageSize
			);
		},
		displayData(
			lwin,
			name,
			bottleSize,
			description,
			wivVintage,
			brand,
			producer,
			productionCountry,
			region,
			appelation,
			vintage,
			grape,
			maturity,
			wineHeritage,
			investmentGrade,
			origin,
			source,
			priceType
		) {
			this.lwin = lwin.value;
			this.name = name;
			this.bottleSize = bottleSize.value;
			this.description = description;
			this.wivVintage = wivVintage.value;
			this.brand = brand.value;
			this.producer = producer.value;
			this.productionCountry = productionCountry.value;
			this.region = region.value;
			this.appelation = appelation.value;
			this.vintage = vintage.value;
			this.grape = grape.value;
			this.maturity = maturity.value;
			this.wineHeritage = wineHeritage.value;
			this.investmentGrade = investmentGrade.value;
			this.origin = origin.value;
			this.source = source.value;
			this.priceType = priceType.value;

			axios
				.post(
					'https://sandbox-api.liv-ex.com/data/v2/priceData',
					{
						lwin: [this.lwin],
						priceType: ['A'],
						priceDate: '',
						currency: 'EUR',
					},
					{
						headers: {
							CLIENT_KEY: process.env.VUE_APP_CLIENT_KEY,
							CLIENT_SECRET: process.env.VUE_APP_CLIENT_SECRET,
							ACCEPT: 'application/json',
						},
					}
				)
				.then((res) => {
					this.price = res.data.lwinDetail[0].dataDetail[0].priceData;
				});
		},
	},
	mounted() {
		this.getNFTs();
	},
	beforeMount() {
		this.updateVisibleNFTs();
	},
};
</script>

<style></style>
