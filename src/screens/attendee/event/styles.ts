import { StyleSheet } from 'react-native'

interface Props {
  bottomInset: number,
  imageHeight: number,
  topInset: number,
}

const styles = ({
  bottomInset,
  imageHeight,
  topInset,
}: Props) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  header: {
    backgroundColor: 'transparent',
    height: topInset + 56,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(249, 249, 249, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContentContainer: {
    paddingBottom: bottomInset + 128,
  },
  heroImage: {
    width: '100%',
    height: imageHeight,
    backgroundColor: '#D9D9D9',
  },
  detailsContainer: {
    padding: 20,
    marginTop: -28,
    backgroundColor: '#F7F7F8',
    gap: 18,
  },
  title: {
    color: '#111',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 18,
  },
  infoIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9F4EF',
  },
  infoTextContainer: {
    flex: 1,
    gap: 4,
  },
  infoTitle: {
    color: '#111',
  },
  mutedText: {
    color: '#777',
  },
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 8,
  },
  organizerImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#D9D9D9',
  },
  sectionContainer: {
    gap: 12,
  },
  sectionTitle: {
    color: '#111',
  },
  descriptionText: {
    color: '#555',
    lineHeight: 24,
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: bottomInset + 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    color: '#3C896D',
  },
  ticketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 18,
    backgroundColor: '#3C896D',
  },
  ticketButtonText: {
    color: '#F9F9F9',
  },
  loaderContainer: {
    minHeight: imageHeight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },
  errorTitle: {
    color: '#111',
    textAlign: 'center',
  },
})

export default styles
