import type { Style } from "@react-pdf/types";
import type { TemplatePageProps } from "../../document";
import type {
	TemplateColorRoles,
	TemplateFeatureStyleSlots,
	TemplateFeatures,
	TemplateStyleContext,
	TemplateStyleSlots,
} from "../shared/types";
import { Fragment, useMemo } from "react";
import { Image, Page, StyleSheet, View } from "#react-pdf-renderer";
import { useRender } from "../../context";
import { useRenderedSectionIds, useResolvedNode } from "../../semantic/context";
import { semanticNodeKeys } from "../../semantic/node-keys";
import { createBaseTemplateStyles } from "../shared/base-template-styles";
import { TemplateProvider } from "../shared/context";
import { filterSections } from "../shared/filtering";
import { getTemplateMetrics } from "../shared/metrics";
import { Heading, SemanticHeaderView, SemanticRegionView, Text } from "../shared/primitives";
import { createRtlStyleHelpers } from "../shared/rtl";
import { Section } from "../shared/sections";
import { composeStyles, headerNameLineHeight, resolvePlacementColor } from "../shared/styles";

type AzurillStyles = Omit<TemplateStyleSlots, "page"> & {
	page: Style;
	contentRow: Style;
	sidebarColumn: Style;
	mainColumn: Style;
	horizontalRule: Style;
	header: Style;
	picture: Style;
	headerTitle: Style;
	headerIdentity: Style;
	headerName: Style;
	headerContactRow: Style;
	headerContactItem: Style;
};

type AzurillTemplate = {
	colors: TemplateColorRoles;
	styles: AzurillStyles;
	featureStyles: TemplateFeatureStyleSlots;
};

type AzurillHeaderProps = {
	styles: AzurillStyles;
};

const azurillFeatures = {
	sectionTimeline: true,
	experienceRoleFirst: true,
	educationDegreeFirst: true,
	languageInline: true,
} satisfies TemplateFeatures;

export const AzurillPage = ({ page, pageSize, pageMinHeightStyle, showHeader, pageNumber }: TemplatePageProps) => {
	const data = useRender();
	const pageNodeKey = semanticNodeKeys.page(pageNumber);
	const { style: semanticPageStyle, size: semanticPageSize, ...semanticPageProps } = useResolvedNode(pageNodeKey);
	const { metadata } = data;
	const { colors, styles, featureStyles } = useAzurillTemplate();
	const metrics = getTemplateMetrics(metadata.page);
	const isFirstPage = pageNumber === 1;
	const sidebarSections = useRenderedSectionIds(pageNodeKey, filterSections(page.sidebar, data));
	const visibleMainSections = filterSections(page.main, data);
	const renderedMainSections = useRenderedSectionIds(pageNodeKey, visibleMainSections);
	const mainSections =
		isFirstPage && page.main.includes("summary") && renderedMainSections.includes("summary")
			? ["summary", ...renderedMainSections.filter((section) => section !== "summary")]
			: renderedMainSections;

	return (
		<Page
			{...semanticPageProps}
			size={semanticPageSize ?? pageSize}
			style={composeStyles(styles.page, pageMinHeightStyle, semanticPageStyle)}
		>
			<TemplateProvider
				pageNodeKey={pageNodeKey}
				styles={styles}
				featureStyles={featureStyles}
				colors={colors}
				features={azurillFeatures}
			>
				{showHeader && <Header styles={styles} />}

				<View style={composeStyles(styles.contentRow, { columnGap: metrics.columnGap })}>
					<SemanticRegionView
						region="sidebar"
						style={composeStyles(styles.sidebarColumn, {
							flexBasis: `${metadata.layout.sidebarWidth}%`,
							display: page.fullWidth ? "none" : "flex",
							rowGap: metrics.sectionGap,
						})}
					>
						<View style={styles.horizontalRule} />
						<View style={{ rowGap: 4 }}>
							<View style={{ borderBottomWidth: 0.5, borderBottomColor: "#FCB51B", paddingBottom: 2 }}>
								<Heading style={{ color: "#000000", fontSize: 12 }}>CONTACT</Heading>
							</View>
							<Text style={{ color: "#FCB51B", fontSize: 8, fontWeight: "bold" }}>PHONE</Text>
							<Text style={{ color: "#000000", fontSize: 9 }}>+256 312314317</Text>
							<Text style={{ color: "#FCB51B", fontSize: 8, fontWeight: "bold" }}>EMAIL</Text>
							<Text style={{ color: "#000000", fontSize: 9 }}>hr@gold-serve.com</Text>
							<Text style={{ color: "#FCB51B", fontSize: 8, fontWeight: "bold" }}>LOCATION</Text>
							<Text style={{ color: "#000000", fontSize: 9 }}>Kampala, Uganda</Text>
						</View>
						{sidebarSections.map((section) => (
							<Fragment key={section}>
								{section === "references" ? <StaticReferences /> : <Section section={section} placement="sidebar" />}
							</Fragment>
						))}
					</SemanticRegionView>

					<SemanticRegionView region="main" style={composeStyles(styles.mainColumn, { rowGap: metrics.sectionGap })}>
						{mainSections.map((section) => (
							<Fragment key={section}>
								{section === "summary" && <View style={styles.horizontalRule} />}
								{section === "references" ? <StaticReferences /> : <Section section={section} placement="main" />}
							</Fragment>
						))}
					</SemanticRegionView>
				</View>
				<Image
					src="/logo/goldserve-people.png"
					fixed
					style={{
						width: 125,
						height: 95,
						position: "absolute",
						bottom: 0,
						left: 0,
					}}
				/>
			</TemplateProvider>
		</Page>
	);
};

const StaticReferences = () => (
	<View style={{ rowGap: 4 }}>
		<Heading
			style={{
				color: "#000000",
				borderBottomWidth: 0.5,
				borderBottomColor: "#FCB51B",
				paddingBottom: 2,
			}}
		>
			REFERENCES
		</Heading>
		<Text style={{ fontSize: 9 }}>hr@gold-serve.com</Text>
	</View>
);

const Header = ({ styles }: AzurillHeaderProps) => {
	const { basics } = useRender();

	return (
		<SemanticHeaderView style={styles.header}>
			<View style={styles.headerTop}>
				<View style={styles.headerIdentity}>
					<Heading style={styles.headerName}>{basics.name}</Heading>
					<Text style={styles.headerHeadline}>{basics.headline}</Text>
				</View>

				<Image src="/logo/glh-light.png" style={styles.glhLogo} />
			</View>
		</SemanticHeaderView>
	);
};

const useAzurillTemplate = (): AzurillTemplate => {
	const { picture, metadata, rtl } = useRender();

	return useMemo(() => {
		const r = createRtlStyleHelpers(rtl);
		const foreground = "#000000";
		const background = "#FFFFFF";
		const primary = "#FCB51B";
		const colors: TemplateColorRoles = { foreground, background, primary };
		const metrics = getTemplateMetrics(metadata.page);

		const base = createBaseTemplateStyles({ metadata, foreground, background, r, metrics, picture });

		const baseStyles = StyleSheet.create({
			...base,
			page: {
				...base.page,
				flexDirection: "column",
				rowGap: metrics.headerGap,
				columnGap: metrics.columnGap,
				paddingHorizontal: metrics.page.paddingHorizontal,
				paddingVertical: metrics.page.paddingVertical,
			},
			sectionHeading: {
				color: foreground,
				borderBottomWidth: 0.5,
				borderBottomColor: primary,
				paddingBottom: 2,
			},
			contentRow: {
				flexDirection: r.row,
			},
			sidebarColumn: {},
			mainColumn: {
				flex: 1,
			},
			horizontalRule: {
				height: 0.5,
				backgroundColor: "#D1D3D4",
				width: "100%",
				marginBottom: metrics.gapY(1),
			},
			header: {
				rowGap: metrics.gapY(0.5),
			},

			headerTop: {
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "flex-start",
			},

			headerIdentity: {
				alignItems: "flex-start",
				textAlign: "left",
				rowGap: metrics.gapY(0.25),
			},

			headerName: {
				fontSize: metadata.typography.heading.fontSize * 1.5,
				lineHeight: headerNameLineHeight,
				color: foreground,
			},

			headerHeadline: {
				color: primary,
				fontSize: metadata.typography.body.fontSize * 1.1,
			},

			glhLogo: {
				width: 120,
				height: "auto",
			},
		});

		const sectionTimelineStyles = StyleSheet.create({
			items: {
				position: "relative",
			},
			line: {
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 7.5,
				width: 1,
				backgroundColor: primary,
			},
			item: {
				flexDirection: "row",
				columnGap: metrics.gapX(1 / 2),
				position: "relative",
			},
			marker: {
				width: 16,
				alignItems: "center",
			},
			dot: {
				width: 9,
				height: 9,
				marginTop: 10,
				borderRadius: 999,
				borderWidth: 1,
				borderColor: primary,
				backgroundColor: background,
			},
			content: {
				flex: 1,
			},
		});

		const foregroundFor = ({ placement, colors }: TemplateStyleContext) =>
			resolvePlacementColor({
				placement,
				defaultForeground: colors.foreground,
				sidebarForeground: colors.sidebarForeground,
			});

		const accentFor = ({ placement, colors }: TemplateStyleContext) =>
			resolvePlacementColor({
				placement,
				defaultForeground: colors.primary,
				sidebarForeground: colors.sidebarForeground,
			});

		const featureStyles = {
			languageHeader: {
				fluency: { color: "#777777" },
			},
			educationHeader: {
				degree: { color: foreground, fontWeight: "bold" },
				period: { color: primary },
				school: { color: "#666666" },
				location: { color: "#666666" },
			},
			experienceHeader: {
				position: { color: foreground, fontWeight: "bold" },
				period: { color: primary },
				company: { color: "#D1D3D4", fontStyle: "italic", fontWeight: "bold" },
				location: { color: "#D1D3D4", fontStyle: "italic" },
			},
			sectionTimeline: {
				...sectionTimelineStyles,

				// Timeline line remains neutral grey
				line: () => ({
					...sectionTimelineStyles.line,
					top: -metrics.sectionGap,
					backgroundColor: "#D1D3D4",
				}),

				// Timeline dots continue using the selected accent colour
				dot: () => ({
					...sectionTimelineStyles.dot,
					display: "none",
				}),
			},
		} satisfies TemplateFeatureStyleSlots;

		return {
			colors,
			featureStyles,
			styles: {
				...baseStyles,
				text: (context) => ({ ...baseStyles.text, color: foregroundFor(context) }),
				heading: (context) => ({ ...baseStyles.heading, color: foregroundFor(context) }),
				link: (context) => ({ ...baseStyles.link, color: foregroundFor(context) }),
				richParagraph: (context) => ({ ...baseStyles.richParagraph, color: foregroundFor(context) }),
				richListItemMarker: (context) => ({ ...baseStyles.richListItemMarker, color: foregroundFor(context) }),
				richListItemContent: (context) => ({ ...baseStyles.richListItemContent, color: foregroundFor(context) }),
				sectionHeading: () => ({
					...baseStyles.sectionHeading,
					color: foreground,
					borderBottomWidth: 0.5,
					borderBottomColor: primary,
					paddingBottom: 2,
				}),
				icon: (context) => ({
					display: metadata.page.hideIcons ? "none" : "flex",
					size: metadata.typography.body.fontSize,
					color: accentFor(context),
				}),
			} satisfies AzurillStyles,
		};
	}, [picture, metadata, rtl]);
};
